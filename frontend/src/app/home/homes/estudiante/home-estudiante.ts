import { Component, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { DocumentChatbotComponent } from '../../../shared/document-chatbot/document-chatbot';

@Component({
  selector: 'app-home-estudiante',
  standalone: true,
  imports: [CommonModule, DocumentChatbotComponent],
  templateUrl: './home-estudiante.html',
  styleUrl: './home-estudiante.scss',
})
export class HomeEstudianteComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  readonly displayName: string;
  readonly userInitials: string;
  readonly myProjects = signal<any[]>([]);
  readonly loading = signal(false);
  readonly uploading = signal(false);
  readonly error = signal('');
  readonly message = signal('');
  readonly entregas = signal<any[]>([]);
  readonly previewTitle = signal('');
  readonly previewHtml = signal('');
  readonly previewUrl = signal('');
  readonly previewUrlSafe = signal<any>('');
  readonly previewLoading = signal(false);
  readonly previewError = signal('');
  readonly fileTypes = [
    'propuesta',
    'cronograma',
    'informe semana 6',
    'anexos',
    'asesorias',
    'informe final',
  ];
  readonly selectedFile = signal<string>(this.fileTypes[0]);

  readonly selectedEntrega = signal<any | null>(null);

  selectFile(file: string): void {
    this.selectedFile.set(file);
    this.loadEntregasByCarpeta(file);
  }

  async selectEntrega(entrega: any): Promise<void> {
    this.selectedEntrega.set(entrega);
    await this.renderPreview(entrega);
  }

  private countByStatus() {
    const projects = this.myProjects() || [];
    const counts = { approved: 0, pending: 0, failed: 0 };
    for (const p of projects) {
      const estado = (p.estado || '').toString().toLowerCase();
      if (estado.includes('aprob')) counts.approved++;
      else if (estado.includes('reprob') || estado.includes('rechaz')) counts.failed++;
      else counts.pending++;
    }
    return counts;
  }

  get approvedPercent(): number {
    const { approved, pending, failed } = this.countByStatus();
    const total = approved + pending + failed || 1;
    return Math.round((approved / total) * 100);
  }

  get pendingPercent(): number {
    const { approved, pending, failed } = this.countByStatus();
    const total = approved + pending + failed || 1;
    return Math.round((pending / total) * 100);
  }

  get failedPercent(): number {
    const { approved, pending, failed } = this.countByStatus();
    const total = approved + pending + failed || 1;
    return Math.max(0, 100 - this.approvedPercent - this.pendingPercent);
  }

  constructor() {
    const user = this.auth.getStoredUser();
    this.displayName = this.getDisplayName(user);
    this.userInitials = this.buildInitials(this.displayName);
    this.loadEntregasByCarpeta(this.selectedFile());
  }

  goToHome(path: string): void {
    this.router.navigate([path]);
  }

  openFilePicker(): void {
    const input = document.getElementById('student-upload-input') as HTMLInputElement | null;
    input?.click();
  }

  logout(): void {
    this.auth.logout();
  }

  loadEntregasByCarpeta(carpeta: string): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.loading.set(true);
    this.error.set('');
    this.message.set('');

    this.http
      .get<{ data: any[] }>(`/api/entregas/carpeta/${encodeURIComponent(carpeta)}`, { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          const rows = response?.data ?? [];
          if (rows.length > 0) {
            this.entregas.set(rows);
            void this.selectEntrega(rows[0]);
            return;
          }

          this.http
            .get<{ data: any[] }>(`/api/entregas/scan/carpeta/${encodeURIComponent(carpeta)}`, {
              headers,
            })
            .subscribe({
              next: (scanRes) => {
                const rowsFromScan = scanRes?.data ?? [];
                this.entregas.set(rowsFromScan);
                void this.selectEntrega(rowsFromScan[0] ?? null);
              },
              error: () => {
                this.entregas.set([]);
                this.selectedEntrega.set(null);
                this.clearPreview();
              },
            });
        },
        error: () => {
          this.entregas.set([]);
          this.selectedEntrega.set(null);
          this.clearPreview();
        },
      });
  }

  verDocumento(entrega: any): void {
    const url = entrega?.url_descarga;
    if (url) {
      window.open(url, '_blank');
    }
  }

  onUploadDocumento(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      input.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('carpeta', this.selectedFile());
    formData.append('archivo', file);

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.uploading.set(true);
    this.error.set('');
    this.message.set('');

    this.http
      .post<{ message: string }>(`/api/entregas/upload`, formData, { headers })
      .pipe(finalize(() => {
        this.uploading.set(false);
        input.value = '';
      }))
      .subscribe({
        next: (response) => {
          this.message.set(response?.message ?? 'Documento subido correctamente.');
          this.loadEntregasByCarpeta(this.selectedFile());
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo subir el documento.');
        },
      });
  }

  private async renderPreview(entrega: any): Promise<void> {
    this.previewLoading.set(true);
    this.previewError.set('');
    this.previewHtml.set('');
    this.previewUrl.set('');
    this.previewUrlSafe.set('');

    try {
      const fileUrl = this.getEntregaUrl(entrega);
      const fileName = this.getEntregaName(entrega);
      this.previewTitle.set(fileName);

      if (!fileUrl) {
        this.previewError.set('No se encontró la ruta del documento.');
        return;
      }

      const extension = this.getFileExtension(fileName || fileUrl);

      if (extension === 'pdf') {
        this.previewUrl.set(fileUrl);
        try {
          this.previewUrlSafe.set(this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl));
        } catch (e) {
          this.previewUrlSafe.set(fileUrl);
        }
        return;
      }

      if (extension === 'docx' || extension === 'doc') {
        await this.readDOCX(fileUrl);
        return;
      }

      if (extension === 'xlsx' || extension === 'xls') {
        await this.readXLSX(fileUrl);
        return;
      }

      const response = await fetch(fileUrl);
      const text = await response.text();
      this.previewHtml.set(`<pre>${this.escapeHtml(text)}</pre>`);
    } catch (error) {
      console.error('[student preview] error', error);
      this.previewError.set('No se pudo generar la vista previa del documento.');
    } finally {
      this.previewLoading.set(false);
    }
  }

  private async readDOCX(fileUrl: string): Promise<void> {
    const mammoth: any = await import('mammoth');
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    this.previewHtml.set(result.value || '<p>Documento sin contenido.</p>');
  }

  private async readXLSX(fileUrl: string): Promise<void> {
    const XLSX: any = await import('xlsx');
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    let html = '';
    workbook.SheetNames.forEach((sheetName: string) => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      html += `<h4>Hoja: ${this.escapeHtml(sheetName)}</h4>`;
      html += '<table class="preview-table">';
      jsonData.forEach((row: any[]) => {
        html += '<tr>';
        row.forEach((cell) => {
          html += `<td>${this.escapeHtml(cell ?? '')}</td>`;
        });
        html += '</tr>';
      });
      html += '</table>';
    });

    this.previewHtml.set(html || '<p>Hoja vacía.</p>');
  }

  private getEntregaUrl(entrega: any): string {
    return entrega?.url_descarga || (entrega?.archivo ? `/${entrega.archivo}` : '');
  }

  private getEntregaName(entrega: any): string {
    return entrega?.nombre_original || entrega?.archivo || 'Documento';
  }

  private clearPreview(): void {
    this.previewTitle.set('');
    this.previewHtml.set('');
    this.previewUrl.set('');
    this.previewUrlSafe.set('');
    this.previewError.set('');
    this.previewLoading.set(false);
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }

  private getDisplayName(user: Record<string, unknown> | null): string {
    const values = [user?.['nombre'], user?.['name'], user?.['fullName'], user?.['email']];
    const firstValid = values.find(
      (value) => typeof value === 'string' && value.trim().length > 0,
    ) as string | undefined;
    return firstValid?.trim() || 'Estudiante';
  }

  private buildInitials(text: string): string {
    const tokens = text.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return 'ES';
    if (tokens.length === 1) return tokens[0].slice(0, 2).toUpperCase();
    return (tokens[0][0] + tokens[1][0]).toUpperCase();
  }
}
