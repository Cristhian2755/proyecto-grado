import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { AuthService } from '../services/auth.service';

type EntregaRow = {
  id: number;
  archivo: string;
  fecha_entrega: string;
  version: number;
  url_descarga?: string;
  nombre_original?: string;
};

@Component({
  selector: 'app-project-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-estudiante.html',
  styleUrl: './project-estudiante.scss'
})
export class ProjectEstudianteComponent {
  readonly folderOptions = [
    { value: 'propuesta', label: 'Propuesta' },
    { value: 'cronograma', label: 'Cronograma' },
    { value: 'informe semana 6', label: 'Informe semana 6' },
    { value: 'anexos', label: 'Anexos' },
    { value: 'asesoria', label: 'Asesoría' },
    { value: 'informe final', label: 'Informe final' }
  ];

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);

  readonly displayName: string;
  readonly userInitials: string;
  readonly entregas = signal<EntregaRow[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly success = signal('');
  readonly selectedFolder = signal('propuesta');

  readonly previewTitle = signal('');
  readonly previewHtml = signal('');
  readonly previewLoading = signal(false);
  readonly previewError = signal('');

  selectedFiles: File[] = [];

  constructor() {
    const user = this.auth.getStoredUser();
    this.displayName = this.getDisplayName(user);
    this.userInitials = this.buildInitials(this.displayName);
    this.route.queryParamMap.subscribe((params) => {
      const carpeta = params.get('carpeta') || 'propuesta';
      this.selectedFolder.set(this.normalizeFolder(carpeta));
      this.loadEntregasByCarpeta(this.selectedFolder());
    });
  }

  goToHome(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.auth.logout();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFiles = input.files ? Array.from(input.files) : [];

    if (this.selectedFiles.length > 0) {
      void this.previewSelectedFile(this.selectedFiles[0]);
    } else {
      this.clearPreview();
    }
  }

  subirEntrega(): void {
    if (this.selectedFiles.length === 0) {
      this.error.set('Selecciona uno o varios archivos antes de subir la entrega.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const uploads = this.selectedFiles.map((file) => {
      const formData = new FormData();
      formData.append('carpeta', this.selectedFolder());
      formData.append('archivo', file);
      const url = `/api/entregas/upload?carpeta=${encodeURIComponent(this.selectedFolder())}`;
      return this.http.post<{ message: string; data: EntregaRow }>(url, formData, { headers });
    });

    forkJoin(uploads)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (responses) => {
          const total = responses.length;
          this.success.set(`${total} archivo(s) subidos correctamente.`);
          this.selectedFiles = [];
          this.loadEntregasByCarpeta(this.selectedFolder());
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo subir la entrega.');
        }
      });
  }

  loadEntregasByCarpeta(carpeta: string): void {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.get<{ data: EntregaRow[] }>(`/api/entregas/carpeta/${encodeURIComponent(carpeta)}`, { headers }).subscribe({
      next: (response) => {
        const rows = response?.data ?? [];
        if (rows.length > 0) {
          this.entregas.set(rows);
          return;
        }

        // Si la DB no tiene registros, hacer fallback al escaneo del filesystem
        this.http.get<{ data: any[] }>(`/api/entregas/scan/carpeta/${encodeURIComponent(carpeta)}`, { headers }).subscribe({
          next: (scanRes) => {
            this.entregas.set(scanRes?.data?.map((r) => ({
              id: 0,
              archivo: r.archivo,
              fecha_entrega: r.fecha_entrega,
              version: 1,
              url_descarga: r.url_descarga,
              nombre_original: r.nombre_original
            })) ?? []);
          },
          error: () => {
            this.entregas.set([]);
          }
        });
      },
      error: () => {
        this.entregas.set([]);
      }
    });
  }

  verDocumento(entrega?: EntregaRow): void {
    const target = entrega || this.entregas()[0];
    const url = target?.url_descarga;
    if (url) {
      window.open(url, '_blank');
    }
  }

  private async previewSelectedFile(file: File): Promise<void> {
    this.previewTitle.set(file.name);
    this.previewLoading.set(true);
    this.previewError.set('');
    this.previewHtml.set('');

    try {
      const extension = this.getFileExtension(file.name);
      if (extension === 'pdf') {
        await this.readPDF(file);
      } else if (extension === 'docx' || extension === 'doc') {
        await this.readDOCX(file);
      } else if (extension === 'xlsx' || extension === 'xls') {
        await this.readXLSX(file);
      } else {
        this.previewError.set('Formato no soportado para vista previa.');
      }
    } catch (error) {
      console.error('[project-estudiante] preview error', error);
      this.previewError.set('No se pudo generar la vista previa del archivo.');
    } finally {
      this.previewLoading.set(false);
    }
  }

  private async readPDF(file: File): Promise<void> {
    const pdfjsLib: any = await import('pdfjs-dist/build/pdf');
    const pdfjsWorker: any = await import('pdfjs-dist/build/pdf.worker.entry');
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker?.default ?? pdfjsWorker;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let finalText = '';
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');

      finalText += `\n\n--- Página ${pageNum} ---\n\n${pageText}`;
    }

    this.previewHtml.set(`<pre>${this.escapeHtml(finalText.trim())}</pre>`);
  }

  private async readDOCX(file: File): Promise<void> {
    const mammoth: any = await import('mammoth');
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    this.previewHtml.set(`<pre>${this.escapeHtml(result.value)}</pre>`);
  }

  private async readXLSX(file: File): Promise<void> {
    const XLSX: any = await import('xlsx');
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    let html = '';
    workbook.SheetNames.forEach((sheetName: string) => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      html += `<h4>Hoja: ${this.escapeHtml(sheetName)}</h4>`;
      html += '<table>';
      jsonData.forEach((row: any[]) => {
        html += '<tr>';
        row.forEach((cell) => {
          html += `<td>${this.escapeHtml(cell ?? '')}</td>`;
        });
        html += '</tr>';
      });
      html += '</table><br/>';
    });

    this.previewHtml.set(html);
  }

  private clearPreview(): void {
    this.previewTitle.set('');
    this.previewHtml.set('');
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
    const firstValid = values.find((value) => typeof value === 'string' && value.trim().length > 0) as string | undefined;
    return firstValid?.trim() || 'Estudiante';
  }

  private buildInitials(text: string): string {
    const tokens = text.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) {
      return 'ES';
    }

    if (tokens.length === 1) {
      return tokens[0].slice(0, 2).toUpperCase();
    }

    return (tokens[0][0] + tokens[1][0]).toUpperCase();
  }

  private normalizeFolder(value: string): string {
    const normalized = (value || '').toLowerCase().trim();
    const allowed = new Map(this.folderOptions.map((option) => [option.value, option.value]));

    if (allowed.has(normalized)) {
      return normalized;
    }

    if (normalized === 'asesorias') {
      return 'asesoria';
    }

    return 'propuesta';
  }
}
