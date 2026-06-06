import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ProjectService, Proyecto } from '../../../services/project.service';
import { DocumentChatbotComponent } from '../../../shared/document-chatbot/document-chatbot';

type UserRow = {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  carreraId: number | null;
};

type StatCard = {
  icon: string;
  label: string;
  value: string;
};

type QuickAction = {
  label: string;
  ghost?: boolean;
  action: () => void;
};

type AssignmentRow = UserRow & { assignedRole: 'asesor' | 'jurado' };

type DocStatus = {
  propuesta: boolean;
  cronograma: boolean;
  'informe semana 6': boolean;
  anexos: boolean;
  asesorias: boolean;
  'informe final': boolean;
};

type AssistantCard = {
  title: string;
  body: string;
  bullets?: string[];
  button?: string;
  muted?: boolean;
};

@Component({
  selector: 'app-home-coordinador',
  standalone: true,
  imports: [CommonModule, FormsModule, DocumentChatbotComponent],
  templateUrl: './home-coordinador.html',
  styleUrl: './home-coordinador.scss',
})
export class HomeCoordinadorComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly projectService = inject(ProjectService);
  private readonly http = inject(HttpClient);

  readonly displayName: string;
  readonly userInitials: string;
readonly coordinadorCarreraId = signal<number | null>(null);
   readonly users = signal<UserRow[]>([]);
   readonly estudiantes = computed(() =>
     this.users().filter((user) => 
       (user.rol || '').toLowerCase() === 'estudiante' && 
       (!this.coordinadorCarreraId() || user.carreraId === this.coordinadorCarreraId())
     ),
   );
   readonly docentes = signal<UserRow[]>([]);
   readonly docenteAssignments = signal<AssignmentRow[]>([]);
   readonly projects = signal<Proyecto[]>([]);
   readonly loading = signal(false);
   readonly error = signal('');
   readonly message = signal('');
   readonly docStatus = signal<Record<number, DocStatus>>({});
   readonly stats: StatCard[] = [
    { icon: '📁', label: 'Proyectos Activos', value: '' },
    { icon: '👥', label: 'Alumnos Registrados', value: '' },
    { icon: '📋', label: 'Asignaciones Pendientes', value: '15 docentes' },
    { icon: '📊', label: 'Indicador de Avance Promedio', value: '72%' },
  ];

  readonly quickActions: QuickAction[] = [
    { label: 'Propuestas', ghost: true, action: () => this.goToProjects() },
    { label: 'Cronogramas', ghost: true, action: () => this.goToProjects() },
    { label: 'Informes', ghost: true, action: () => this.goToProjects() },
    { label: 'Anexos', ghost: true, action: () => this.goToProjects() },
    { label: 'Asesorias', action: () => this.goToProjects() },
  ];

  readonly assistantCards: AssistantCard[] = [
    {
      title: 'Chatbot IA',
      body: 'Hola, he analizado los proyectos. Recomiendo a Dr. Morales como asesor.',
      bullets: ['Perfil especializado en IA', 'Publicaciones recientes', 'Disponibilidad actual'],
    },
    {
      title: 'Asesor recomendado',
      body: 'Estudiante X (Tema IA): Dr. Morales',
      bullets: ['Perfil Docente: IA', 'Publicaciones Recientes'],
      button: 'Recomendaciones',
    },
    {
      title: 'Sugerencia de Jurado',
      body: 'Proyecto de Redes',
      button: 'Sugerencia',
    },
    {
      title: 'Alertas del Asistente',
      body: '"Docente Y tiene sobrecarga - 5 asesorias"',
      muted: true,
    },
  ];

  readonly fileTypes = [
    'propuesta',
    'cronograma',
    'informe semana 6',
    'anexos',
    'asesorias',
    'informe final',
  ];

  readonly selectedFile = signal<string>(this.fileTypes[0]);
  readonly entregas = signal<any[]>([]);
readonly selectedCarpeta = signal<string>(this.fileTypes[0]);
   readonly selectedStudent = signal<UserRow | null>(null);
   readonly selectedDocente = signal<UserRow | null>(null);
   readonly selectedEntrega = signal<any | null>(null);
   readonly previewHtml = signal('');
   readonly previewUrlSafe = signal<any>('');
readonly previewLoading = signal(false);
    readonly previewError = signal('');
    readonly selectedStudentForRole = signal<number | null>(null);
    readonly roleType = signal<'asesor' | 'jurado'>('asesor');

    get selectedStudentForRoleId(): number | null {
      return this.selectedStudentForRole();
    }
    set selectedStudentForRoleId(value: number | null) {
      this.selectedStudentForRole.set(typeof value === 'string' ? Number(value) : value);
    }

    get roleTypeValue(): 'asesor' | 'jurado' {
      return this.roleType();
    }
    set roleTypeValue(value: 'asesor' | 'jurado') {
      this.roleType.set(value);
    }

  selectFile(file: string): void {
    this.selectedFile.set(file);
    const selectedStudent = this.selectedStudent();
    if (selectedStudent) {
      void this.loadStudentDocument(selectedStudent.id);
    }
  }

selectStudent(user: UserRow): void {
     this.selectedStudent.set(user);
     this.selectedDocente.set(null);
     this.selectedStudentForRole.set(null);
     this.message.set('');
     this.error.set('');
     const currentStatus = this.docStatus()[user.id];
     if (!currentStatus) {
       this.docStatus.set({
         ...this.docStatus(),
         [user.id]: {
           propuesta: false,
           cronograma: false,
           'informe semana 6': false,
           anexos: false,
           asesorias: false,
           'informe final': false,
         },
       });
     }
     void this.loadStudentDocument(user.id);
    this.loadStudentDocumentStatus(user.id);
  }

  loadStudentDocumentStatus(studentId: number): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http
      .get<{ data: any[] }>(`/api/entregas/usuario/${studentId}`, { headers })
      .subscribe({
        next: (response) => {
          const entregas = response?.data ?? [];
          const status: DocStatus = {
            propuesta: entregas.some((e) => this.normalizeCarpeta(e.carpeta) === 'propuesta'),
            cronograma: entregas.some((e) => this.normalizeCarpeta(e.carpeta) === 'cronograma'),
            'informe semana 6': entregas.some((e) => this.normalizeCarpeta(e.carpeta) === 'informe semana 6'),
            anexos: entregas.some((e) => this.normalizeCarpeta(e.carpeta) === 'anexos'),
            asesorias: entregas.some((e) => this.normalizeCarpeta(e.carpeta) === 'asesoria'),
            'informe final': entregas.some((e) => this.normalizeCarpeta(e.carpeta) === 'informe final'),
          };
          this.docStatus.set({ ...this.docStatus(), [studentId]: status });
        },
        error: () => {},
      });
  }

  selectDocente(user: UserRow): void {
    this.selectedDocente.set(user);
    this.selectedStudent.set(null);
    this.selectedStudentForRole.set(null);
    this.roleType.set('asesor');
    this.message.set('');
    this.error.set('');
    this.docenteAssignments.set([]);
    this.loadDocenteAssignments(user.id);
  }

  getStudentsForDocente(): AssignmentRow[] {
    return this.docenteAssignments();
  }

  selectStudentForDocente(student: AssignmentRow): void {
    this.selectedStudentForRole.set(student.id);
    this.roleType.set(student.assignedRole);
  }

  loadDocenteAssignments(docenteId: number): void {
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
      .get<{ data: AssignmentRow[] }>(`/api/auth/users/${docenteId}/assignments`, { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.docenteAssignments.set(response?.data ?? []);
        },
        error: (err: any) => {
          this.error.set(
            err?.error?.message ?? 'No se pudieron cargar las asignaciones del docente.',
          );
        },
      });
  }

  assignOrUpdateStudentRole(): void {
    const docente = this.selectedDocente();
    if (!docente || !this.selectedStudentForRole()) {
      this.error.set('Selecciona un docente y un estudiante.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const studentId = Number(this.selectedStudentForRole());
    if (Number.isNaN(studentId)) {
      this.loading.set(false);
      this.error.set('ID de estudiante inválido.');
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http
      .post<{ message: string }>(
        `/api/auth/users/${docente.id}/assignments`,
        { studentId, role: this.roleType() },
        { headers },
      )
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.message.set(res?.message ?? 'Asignación guardada correctamente.');
          this.error.set('');
          this.selectedStudentForRole.set(null);
          this.roleType.set('asesor');
          this.loadDocenteAssignments(docente.id);
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo asignar el estudiante.');
          this.message.set('');
        },
      });
  }

  removeStudentRole(): void {
    const docente = this.selectedDocente();
    if (!docente || !this.selectedStudentForRole()) {
      this.error.set('Selecciona un docente y un estudiante.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const studentId = Number(this.selectedStudentForRole());
    if (Number.isNaN(studentId)) {
      this.loading.set(false);
      this.error.set('ID de estudiante inválido.');
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http
      .delete<{ message: string }>(`/api/auth/users/${docente.id}/assignments/${studentId}`, {
        headers,
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.message.set(res?.message ?? 'Asignación eliminada correctamente.');
          this.error.set('');
          this.selectedStudentForRole.set(null);
          this.roleType.set('asesor');
          this.loadDocenteAssignments(docente.id);
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo eliminar la asignación.');
          this.message.set('');
        },
      });
  }

  private countByStatus() {
    const projects = this.projects() || [];
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

  get studentDocStats(): { submitted: number; missing: number; total: number; percent: number } {
    const student = this.selectedStudent();
    if (!student) return { submitted: 0, missing: 6, total: 6, percent: 0 };
    
    const status = this.docStatus()[student.id] ?? {
      propuesta: false,
      cronograma: false,
      'informe semana 6': false,
      anexos: false,
      asesorias: false,
      'informe final': false,
    };
    
    const submitted = Object.values(status).filter(Boolean).length;
    const total = 6;
    const missing = total - submitted;
    return { submitted, missing, total, percent: Math.round((submitted / total) * 100) };
  }

  readonly ringRadius = 52;
  get ringCircumference(): number {
    return 2 * Math.PI * this.ringRadius;
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
    this.coordinadorCarreraId.set(user?.['carrera_id'] != null ? Number(user['carrera_id']) : null);
    this.loadDashboardData();
  }

  verDocumento(entrega: any): void {
    const url = entrega?.url_descarga;
    this.selectedEntrega.set(entrega ?? null);
    if (url) window.open(url, '_blank');
  }

  loadEntregasByCarpeta(carpeta: string): void {
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

  goToProjects(): void {
    this.router.navigate(['/project']);
  }

  goToStudentRegister(): void {
    this.router.navigate(['/register-student']);
  }

  goToDocenteRegister(): void {
    this.router.navigate(['/register-docente']);
  }

  logout(): void {
    this.auth.logout();
  }

  loadDashboardData(): void {
    this.loadUsers();
    this.loadProjects();
  }

  loadUsers(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http
      .get<{ data: UserRow[] }>('/api/auth/users', { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
next: (response) => {
          const allUsers = response?.data ?? [];
          
// Mapear carrera_id a carreraId para compatibilidad con el tipo UserRow
           const mappedUsers = allUsers.map((u: any) => ({
             ...u,
             carreraId: u.carrera_id != null ? Number(u.carrera_id) : null,
           }));
           
           // Filtrar por carrera si el coordinador tiene asignada una carrera
           const carreraId = this.coordinadorCarreraId();
           const filteredUsers = carreraId
             ? mappedUsers.filter((u: UserRow) => u.carreraId === carreraId)
             : mappedUsers;
          
          this.users.set(filteredUsers);
          // also extract docentes for the docentes panel
          this.docentes.set(
            filteredUsers.filter((u) => (u.rol || '').toLowerCase() === 'docente'),
          );
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudieron cargar los usuarios.');
        },
      });
  }

  loadProjects(): void {
    this.loading.set(true);
    this.error.set('');

    this.projectService
      .getAllProjects()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.projects.set(response?.data ?? []);
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudieron cargar los proyectos.');
        },
      });
  }

  switchTab(tab: 'dashboard' | 'usuarios' | 'proyectos'): void {
    void tab;
  }

  getStats(): StatCard[] {
    const projects = this.projects();
    const students = this.users().filter((user) => user.rol?.toLowerCase() === 'estudiante').length;

    return this.stats.map((stat) => {
      if (stat.label === 'Proyectos Activos') {
        return { ...stat, value: String(projects.length) };
      }

      if (stat.label === 'Alumnos Registrados') {
        return { ...stat, value: String(students) };
      }

      return stat;
    });
  }

  private getDisplayName(user: Record<string, unknown> | null): string {
    const values = [user?.['nombre'], user?.['name'], user?.['fullName'], user?.['email']];
    const firstValid = values.find(
      (value) => typeof value === 'string' && value.trim().length > 0,
    ) as string | undefined;
    return firstValid?.trim() || 'Coordinador';
  }

  private buildInitials(text: string): string {
    const tokens = text.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) {
      return 'CO';
    }

    if (tokens.length === 1) {
      return tokens[0].slice(0, 2).toUpperCase();
    }

    return (tokens[0][0] + tokens[1][0]).toUpperCase();
  }

  private async loadStudentDocument(studentId: number): Promise<void> {
    const selectedFile = this.selectedFile();
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.previewError.set('No hay sesión activa.');
      return;
    }

    try {
      this.previewLoading.set(true);
      this.previewError.set('');
      this.previewHtml.set('');
      this.previewUrlSafe.set('');

      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      
      // Obtener entregas del estudiante para la carpeta seleccionada
      const response = await this.http
        .get<{ data: any[] }>(`/api/entregas/usuario/${studentId}`, { headers })
        .toPromise();

      const entregas = response?.data ?? [];
      const entrega = entregas.find(e => e.carpeta === this.normalizeCarpeta(selectedFile));

      if (!entrega) {
        this.previewError.set('No hay documento disponible para esta carpeta.');
        this.previewLoading.set(false);
        return;
      }

      await this.renderPreview(entrega);
    } catch (error) {
      console.error('Error cargando documento del estudiante:', error);
      this.previewError.set('No se pudo cargar el documento del estudiante.');
      this.previewLoading.set(false);
    }
  }

  private normalizeCarpeta(carpeta: string): string {
    const folderAliases: Record<string, string> = {
      'propuesta': 'propuesta',
      'cronograma': 'cronograma',
      'informe semana 6': 'informe semana 6',
      'anexos': 'anexos',
      'asesoria': 'asesoria',
      'asesorias': 'asesoria',
      'informe final': 'informe final'
    };

    const normalized = (carpeta || 'propuesta').toString().toLowerCase().trim();
    return folderAliases[normalized] || 'propuesta';
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
        try {
          this.previewUrlSafe.set(fileUrl);
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
      console.error('[coordinator preview] error', error);
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

  private getEntregaUrl(entrega: any): string {
    return entrega?.url_descarga || (entrega?.archivo ? `/${entrega.archivo}` : '');
  }

  private getEntregaName(entrega: any): string {
    return entrega?.nombre_original || entrega?.archivo || 'Documento';
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
}
