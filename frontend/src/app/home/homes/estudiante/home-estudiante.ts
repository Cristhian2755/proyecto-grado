import { Component, inject, signal, AfterViewInit } from '@angular/core';
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
export class HomeEstudianteComponent implements AfterViewInit {
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
    'asesoria',
    'informe final',
  ];
  readonly selectedFile = signal<string>(this.fileTypes[0]);

  readonly selectedEntrega = signal<any | null>(null);
  readonly onlyofficeReady = signal(false);

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

  ngAfterViewInit(): void {
    this.onlyofficeReady.set(true);
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

      // Para DOCX, XLSX y otros formatos compatibles con OnlyOffice
      if (['docx', 'doc', 'xlsx', 'xls', 'pptx', 'ppt'].includes(extension)) {
        await this.renderOnlyOfficePreview(fileUrl, fileName);
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

  private async renderOnlyOfficePreview(fileUrl: string, fileName: string): Promise<void> {
    try {
      const extension = this.getFileExtension(fileName);
      
      if (extension === 'docx' || extension === 'doc') {
        await this.readDOCXWithStyle(fileUrl);
      } else if (extension === 'xlsx' || extension === 'xls') {
        await this.readXLSXWithStyle(fileUrl);
      }
    } catch (error) {
      console.error('Error renderizando documento:', error);
      this.previewError.set('No se pudo procesar el documento.');
    }
  }

  private async readDOCXWithStyle(fileUrl: string): Promise<void> {
    try {
      const mammoth: any = await import('mammoth');
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      
      const styledHtml = `
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; }
          p { margin: 10px 0; }
          table { border-collapse: collapse; width: 100%; margin: 15px 0; }
          td, th { border: 1px solid #ddd; padding: 10px; text-align: left; }
          th { background: #f5f5f5; font-weight: bold; }
          h1, h2, h3 { color: #0ca58c; margin: 15px 0 10px; }
          strong { font-weight: bold; }
          em { font-style: italic; }
          ul, ol { margin: 10px 0; padding-left: 20px; }
        </style>
        ${result.value || '<p>Documento sin contenido.</p>'}
      `;
      this.previewHtml.set(styledHtml);
    } catch (error) {
      console.error('Error leyendo DOCX:', error);
      this.previewError.set('No se pudo leer el archivo DOCX.');
    }
  }

  private async readXLSXWithStyle(fileUrl: string): Promise<void> {
    try {
      const XLSXModule: any = await import('xlsx');
      const XLSX = XLSXModule.default || XLSXModule;
      
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Error al descargar archivo: ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      if (arrayBuffer.byteLength === 0) {
        throw new Error('Archivo vacío');
      }
      
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
      
      if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
        throw new Error('El archivo no contiene hojas válidas');
      }

      let html = `
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; }
          .sheet-container { margin-bottom: 30px; }
          .sheet-title { font-size: 18px; font-weight: bold; color: #0ca58c; margin: 20px 0 10px; }
          table { border-collapse: collapse; width: 100%; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
          td, th { border: 1px solid #cbd5e1; padding: 12px; text-align: left; }
          th { background: #0ca58c; color: white; font-weight: bold; }
          tr:nth-child(even) { background: #f8fafc; }
          tr:hover { background: #e8f5f2; }
        </style>
      `;

      workbook.SheetNames.forEach((sheetName: string) => {
        try {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          html += `<div class="sheet-container">`;
          html += `<div class="sheet-title">📋 ${this.escapeHtml(sheetName)}</div>`;
          html += '<table><tbody>';
          
          if (jsonData && jsonData.length > 0) {
            jsonData.forEach((row: any[], rowIdx: number) => {
              html += '<tr>';
              row.forEach((cell: any) => {
                const tag = rowIdx === 0 ? 'th' : 'td';
                const cellValue = cell !== null && cell !== undefined ? String(cell) : '';
                html += `<${tag}>${this.escapeHtml(cellValue)}</${tag}>`;
              });
              html += '</tr>';
            });
          } else {
            html += '<tr><td colspan="100%">Hoja vacía</td></tr>';
          }
          
          html += '</tbody></table></div>';
        } catch (sheetError) {
          console.error(`Error procesando hoja ${sheetName}:`, sheetError);
          html += `<div class="sheet-container"><p>Error al procesar hoja: ${this.escapeHtml(sheetName)}</p></div>`;
        }
      });

      this.previewHtml.set(html || '<p>No se pudo procesar el archivo.</p>');
    } catch (error) {
      console.error('Error leyendo XLSX:', error);
      this.previewError.set(`No se pudo leer el archivo XLSX: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  private getDocumentType(fileName: string): string {
    const ext = this.getFileExtension(fileName).toLowerCase();
    if (['docx', 'doc'].includes(ext)) return 'text';
    if (['xlsx', 'xls'].includes(ext)) return 'spreadsheet';
    if (['pptx', 'ppt'].includes(ext)) return 'presentation';
    return 'text';
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
