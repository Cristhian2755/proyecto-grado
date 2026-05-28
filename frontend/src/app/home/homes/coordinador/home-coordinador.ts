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
  readonly users = signal<UserRow[]>([]);
  readonly estudiantes = computed(() =>
    this.users().filter((user) => (user.rol || '').toLowerCase() === 'estudiante'),
  );
  readonly docentes = signal<UserRow[]>([]);
  readonly docenteAssignments = signal<AssignmentRow[]>([]);
  readonly projects = signal<Proyecto[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly message = signal('');
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
  selectedStudentForRole: number | null = null;
  roleType: 'asesor' | 'jurado' = 'asesor';

  selectFile(file: string): void {
    this.selectedFile.set(file);
  }

  selectStudent(user: UserRow): void {
    this.selectedStudent.set(user);
    this.selectedDocente.set(null);
    this.selectedStudentForRole = null;
    this.message.set('');
    this.error.set('');
  }

  selectDocente(user: UserRow): void {
    this.selectedDocente.set(user);
    this.selectedStudent.set(null);
    this.selectedStudentForRole = null;
    this.roleType = 'asesor';
    this.message.set('');
    this.error.set('');
    this.docenteAssignments.set([]);
    this.loadDocenteAssignments(user.id);
  }

  getStudentsForDocente(): AssignmentRow[] {
    return this.docenteAssignments();
  }

  selectStudentForDocente(student: AssignmentRow): void {
    this.selectedStudentForRole = student.id;
    this.roleType = student.assignedRole;
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
    if (!docente || !this.selectedStudentForRole) {
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

    const studentId = Number(this.selectedStudentForRole);
    if (Number.isNaN(studentId)) {
      this.loading.set(false);
      this.error.set('ID de estudiante inválido.');
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http
      .post<{ message: string }>(
        `/api/auth/users/${docente.id}/assignments`,
        { studentId, role: this.roleType },
        { headers },
      )
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.message.set(res?.message ?? 'Asignación guardada correctamente.');
          this.error.set('');
          this.selectedStudentForRole = null;
          this.roleType = 'asesor';
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
    if (!docente || !this.selectedStudentForRole) {
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

    const studentId = Number(this.selectedStudentForRole);
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
          this.selectedStudentForRole = null;
          this.roleType = 'asesor';
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

  constructor() {
    const user = this.auth.getStoredUser();
    this.displayName = this.getDisplayName(user);
    this.userInitials = this.buildInitials(this.displayName);
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
          this.users.set(response?.data ?? []);
          // also extract docentes for the docentes panel
          this.docentes.set(
            (response?.data ?? []).filter((u) => (u.rol || '').toLowerCase() === 'docente'),
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
}
