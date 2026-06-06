import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { finalize } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ProjectService, Proyecto } from '../../../services/project.service';
import { DocumentChatbotComponent } from '../../../shared/document-chatbot/document-chatbot';

@Component({
  selector: 'app-home-docente',
  standalone: true,
  imports: [CommonModule, FormsModule, DocumentChatbotComponent],
  templateUrl: './home-docente.html',
  styleUrl: './home-docente.scss',
})
export class HomeDocenteComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly projectService = inject(ProjectService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly displayName: string;
  readonly userInitials: string;
  readonly assignedProjects = signal<Proyecto[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  /** Modal state */
  readonly selectedProject = signal<Proyecto | null>(null);
  readonly showModal = signal(false);
  readonly entregas = signal<any[]>([]);
  readonly selectedEntrega = signal<any | null>(null);
  readonly selectedStudent = signal<any | null>(null);
  readonly previewHtml = signal('');
  readonly previewUrlSafe = signal<any>('');
  readonly previewLoading = signal(false);
  readonly previewError = signal('');
  readonly carpetaOptions = [
    'propuesta',
    'cronograma',
    'informe semana 6',
    'anexos',
    'asesoria',
    'informe final',
  ];
  readonly fileTypes = this.carpetaOptions;
  readonly selectedCarpeta = signal<string>(this.carpetaOptions[0]);
  readonly selectedFile = signal<string>(this.carpetaOptions[0]);
  readonly docStatus = signal<Record<string, { propuesta: boolean; cronograma: boolean; 'informe semana 6': boolean; anexos: boolean; asesorias: boolean; 'informe final': boolean }>>({});

  readonly ringRadius = 52;
  get ringCircumference(): number {
    return 2 * Math.PI * this.ringRadius;
  }
  get studentDocStats(): { submitted: number; missing: number; total: number; percent: number } {
    const student = this.selectedStudent();
    if (!student) return { submitted: 0, missing: 6, total: 6, percent: 0 };
    const status = this.docStatus()[student.id] ?? { propuesta: false, cronograma: false, 'informe semana 6': false, anexos: false, asesorias: false, 'informe final': false };
    const submitted = Object.values(status).filter(Boolean).length;
    return { submitted, missing: 6 - submitted, total: 6, percent: Math.round((submitted / 6) * 100) };
  }
  get ringOffset(): number {
    const circumference = this.ringCircumference;
    const percent = this.studentDocStats.percent / 100;
    return circumference - percent * circumference;
  }

  constructor() {
    const user = this.auth.getStoredUser();
    this.displayName = this.getDisplayName(user);
    this.userInitials = this.buildInitials(this.displayName);
    this.loadAssignedProjects();
  }

  verDocumento(entrega: any): void {
    const url = entrega?.url_descarga;
    this.selectedEntrega.set(entrega ?? null);
    if (url) window.open(url, '_blank');
  }

  selectFile(file: string): void {
    this.selectedFile.set(file);
    this.selectedCarpeta.set(file);
    const student = this.selectedStudent();
    if (student) {
      void this.loadStudentDocuments(student.id, file);
    }
  }

  selectStudent(student: any): void {
    this.selectedStudent.set(student);
    this.selectedCarpeta.set(this.carpetaOptions[0]);
    void this.loadStudentDocuments(student.id, this.carpetaOptions[0]);
    void this.loadStudentDocumentStatus(student.id);
  }

  loadEntregasByCarpeta(carpeta: string): void {
    const student = this.selectedStudent();
    if (student) {
      void this.loadStudentDocuments(student.id, carpeta);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) return;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.loading.set(true);
    this.http
      .get<{ data: any[] }>(`/api/entregas/carpeta/${encodeURIComponent(carpeta)}`, { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          const rows = res?.data ?? [];
          if (rows.length > 0) {
            this.entregas.set(rows);
            this.selectedEntrega.set(rows[0] ?? null);
            return;
          }

          // Fallback: scan filesystem
          this.http
            .get<{
              data: any[];
            }>(`/api/entregas/scan/carpeta/${encodeURIComponent(carpeta)}`, { headers })
            .subscribe({
              next: (scanRes) => {
                const rowsFromScan = scanRes?.data ?? [];
                this.entregas.set(rowsFromScan);
                this.selectedEntrega.set(rowsFromScan[0] ?? null);
              },
              error: () => {
                this.entregas.set([]);
                this.selectedEntrega.set(null);
              },
            });
        },
        error: () => {
          this.entregas.set([]);
          this.selectedEntrega.set(null);
        },
      });
  }

  goToHome(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.auth.logout();
  }

  loadAssignedProjects(): void {
    this.loading.set(true);
    this.error.set('');

    this.projectService
      .getMyAssignedProjects()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.assignedProjects.set(response?.data ?? []);
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudieron cargar tus proyectos asignados.');
        },
      });
  }

  /** Modal actions */
  openModal(project: Proyecto): void {
    this.selectedProject.set(project);
    this.showModal.set(true);
  }

  closeModal(): void {
    this.selectedProject.set(null);
    this.showModal.set(false);
  }

  saveObservation(): void {
    const project = this.selectedProject();
    if (!project) return;
    this.projectService.updateProject(Number(project.id), { comentario: project.comentario }).subscribe({
      next: () => {
        this.closeModal();
        this.loadAssignedProjects();
      },
      error: (err: any) => {
        this.error.set(err?.error?.message ?? 'Error al guardar observación');
      },
    });
  }

  changeState(): void {
    const project = this.selectedProject();
    if (!project) return;
    this.projectService.updateProject(Number(project.id), { estado: project.estado }).subscribe({
      next: () => {
        this.closeModal();
        this.loadAssignedProjects();
      },
      error: (err: any) => {
        this.error.set(err?.error?.message ?? 'Error al cambiar estado');
      },
    });
  }

  private getDisplayName(user: Record<string, unknown> | null): string {
    const values = [user?.['nombre'], user?.['name'], user?.['fullName'], user?.['email']];
    const firstValid = values.find(
      (value) => typeof value === 'string' && value.trim().length > 0,
    ) as string | undefined;
    return firstValid?.trim() || 'Docente';
  }

  private buildInitials(text: string): string {
    const tokens = text.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return 'DO';
    if (tokens.length === 1) return tokens[0].slice(0, 2).toUpperCase();
    return (tokens[0][0] + tokens[1][0]).toUpperCase();
  }

  private async loadStudentDocuments(studentId: number, carpeta: string): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.previewError.set('No hay sesión activa.');
      return;
    }

    this.previewLoading.set(true);
    this.previewError.set('');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    try {
      const response = await this.http
        .get<{ data: any[] }>(`/api/entregas/usuario/${studentId}`, { headers })
        .toPromise();

      const entregas = response?.data ?? [];
      const normalizedCarpeta = this.normalizeCarpeta(carpeta);
      const entrega = entregas.find(
        (e: any) => this.normalizeCarpeta(e.carpeta) === normalizedCarpeta,
      );

      if (entrega) {
        void this.renderPreview(entrega);
      } else {
        this.previewError.set(`No hay documento para la carpeta "${carpeta}".`);
      }
    } catch (error: any) {
      this.previewError.set('Error al cargar el documento del estudiante.');
    } finally {
      this.previewLoading.set(false);
    }
  }

  private normalizeCarpeta(carpeta: string): string {
    return (carpeta || '').trim().toLowerCase().replace(/\s+/g, '_');
  }

  private loadStudentDocumentStatus(studentId: number): void {
    const token = localStorage.getItem("token");
    if (!token) return;

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http
      .get<{ data: any[] }>(`/api/entregas/usuario/${studentId}`, { headers })
      .subscribe({
        next: (response) => {
          const entregas = response?.data ?? [];
          const status = {
            propuesta: entregas.some((e) => this.normalizeCarpeta(e.carpeta) === "propuesta"),
            cronograma: entregas.some((e) => this.normalizeCarpeta(e.carpeta) === "cronograma"),
            "informe semana 6": entregas.some((e) => this.normalizeCarpeta(e.carpeta) === "informe_semana_6"),
            anexos: entregas.some((e) => this.normalizeCarpeta(e.carpeta) === "anexos"),
            asesorias: entregas.some((e) => this.normalizeCarpeta(e.carpeta) === "asesoria"),
            "informe final": entregas.some((e) => this.normalizeCarpeta(e.carpeta) === "informe_final"),
          };
          this.docStatus.set({ ...this.docStatus(), [studentId]: status });
        },
        error: () => {},
      });
  }

  private async renderPreview(entrega: any): Promise<void> {
    this.previewLoading.set(true);
    this.previewError.set('');
    this.previewHtml.set('');
    this.previewUrlSafe.set('');

    try {
      const fileUrl = this.getEntregaUrl(entrega);
      const fileName = this.getEntregaName(entrega);

      if (!fileUrl) {
        this.previewError.set('No se encontró la ruta del documento.');
        return;
      }

      const extension = this.getFileExtension(fileName || fileUrl);

      if (extension === 'pdf') {
        this.previewUrlSafe.set(this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl));
        return;
      }

      await this.renderOnlyOfficePreview(fileUrl, fileName);
    } catch (error: any) {
      this.previewError.set('Error al renderizar el documento.');
    } finally {
      this.previewLoading.set(false);
    }
  }

  private async renderOnlyOfficePreview(fileUrl: string, fileName: string): Promise<void> {
    const extension = this.getFileExtension(fileName);

    if (extension === 'docx') {
      await this.readDOCXWithStyle(fileUrl);
    } else if (extension === 'xlsx') {
      await this.readXLSXWithStyle(fileUrl);
    } else if (extension === 'txt') {
      try {
        const response = await fetch(fileUrl);
        const text = await response.text();
        this.previewHtml.set(`<pre style="padding: 20px; font-family: monospace; white-space: pre-wrap; word-wrap: break-word; font-size: 14px;">${this.escapeHtml(text)}</pre>`);
      } catch {
        this.previewError.set('No se pudo leer el archivo de texto.');
      }
    } else {
      this.previewError.set(`Formato no soportado: ${extension}`);
    }
  }

  private async readDOCXWithStyle(fileUrl: string): Promise<void> {
    try {
      const mammoth = await import('mammoth');
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();

      const result = await mammoth.convertToHtml({ arrayBuffer });
      const htmlContent = result.value;

      const styledHtml = `
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Calibri, Arial, sans-serif; line-height: 1.5; padding: 20px; margin: 0; color: #333; }
              p { margin: 10px 0; }
              h1, h2, h3, h4, h5, h6 { margin: 15px 0 10px 0; font-weight: bold; }
              table { border-collapse: collapse; width: 100%; margin: 10px 0; }
              th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
              th { background-color: #f0f0f0; font-weight: bold; }
              ul, ol { margin: 10px 0; padding-left: 20px; }
              strong { font-weight: bold; }
              em { font-style: italic; }
            </style>
          </head>
          <body>${htmlContent}</body>
        </html>
      `;

      this.previewHtml.set(styledHtml);
    } catch (error: any) {
      this.previewError.set('Error al leer archivo DOCX.');
    }
  }

  private async readXLSXWithStyle(fileUrl: string): Promise<void> {
    try {
      const XLSX = await import('xlsx');
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data: any[] = XLSX.utils.sheet_to_json(sheet);

      if (data.length === 0) {
        this.previewHtml.set('<p>La hoja está vacía.</p>');
        return;
      }

      const headers = Object.keys(data[0] || {});
      let htmlTable = `
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Calibri, Arial, sans-serif; padding: 20px; margin: 0; color: #333; }
              table { border-collapse: collapse; width: 100%; }
              th { background-color: #0ca58c; color: white; padding: 12px; text-align: left; font-weight: bold; }
              td { border: 1px solid #ddd; padding: 10px; }
              tr:nth-child(even) { background-color: #f9f9f9; }
            </style>
          </head>
          <body>
            <table>
              <thead>
                <tr>
      `;

      headers.forEach((h) => {
        htmlTable += `<th>${this.escapeHtml(h)}</th>`;
      });

      htmlTable += `
                </tr>
              </thead>
              <tbody>
      `;

      data.forEach((row) => {
        htmlTable += '<tr>';
        headers.forEach((h) => {
          const value = row[h] ?? '';
          htmlTable += `<td>${this.escapeHtml(String(value))}</td>`;
        });
        htmlTable += '</tr>';
      });

      htmlTable += `
              </tbody>
            </table>
          </body>
        </html>
      `;

      this.previewHtml.set(htmlTable);
    } catch (error: any) {
      this.previewError.set('Error al leer archivo XLSX.');
    }
  }

  private getEntregaUrl(entrega: any): string {
    return entrega?.url_descarga || entrega?.archivo || '';
  }

  private getEntregaName(entrega: any): string {
    return entrega?.nombre_original || entrega?.archivo || 'documento';
  }

  private escapeHtml(value: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return value.replace(/[&<>"']/g, (char) => map[char] || char);
  }

  private getFileExtension(filename: string): string {
    return (filename.split('.').pop() || '').toLowerCase();
  }
}
