import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ProjectService, Proyecto } from '../../services/project.service';

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
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeCoordinadorComponent {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly projectService = inject(ProjectService);

  readonly displayName: string;
  readonly userInitials: string;
  readonly users = signal<UserRow[]>([]);
  readonly projects = signal<Proyecto[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly stats: StatCard[] = [
    { icon: '📁', label: 'Proyectos Activos', value: '' },
    { icon: '👥', label: 'Alumnos Registrados', value: '' },
    { icon: '📋', label: 'Asignaciones Pendientes', value: '15 docentes' },
    { icon: '📊', label: 'Indicador de Avance Promedio', value: '72%' }
  ];

  readonly quickActions: QuickAction[] = [
    { label: 'Propuestas', ghost: true, action: () => this.goToProjects() },
    { label: 'Cronogramas', ghost: true, action: () => this.goToProjects() },
    { label: 'Informes', ghost: true, action: () => this.goToProjects() },
    { label: 'Anexos', ghost: true, action: () => this.goToProjects() },
    { label: 'Asesorias', action: () => this.goToProjects() }
  ];

  readonly assistantCards: AssistantCard[] = [
    {
      title: 'Chatbot IA',
      body: 'Hola, he analizado los proyectos. Recomiendo a Dr. Morales como asesor.',
      bullets: ['Perfil especializado en IA', 'Publicaciones recientes', 'Disponibilidad actual']
    },
    {
      title: 'Asesor recomendado',
      body: 'Estudiante X (Tema IA): Dr. Morales',
      bullets: ['Perfil Docente: IA', 'Publicaciones Recientes'],
      button: 'Recomendaciones'
    },
    {
      title: 'Sugerencia de Jurado',
      body: 'Proyecto de Redes',
      button: 'Sugerencia'
    },
    {
      title: 'Alertas del Asistente',
      body: '"Docente Y tiene sobrecarga - 5 asesorias"',
      muted: true
    }
  ];

  constructor() {
    const user = this.auth.getStoredUser();
    this.displayName = this.getDisplayName(user);
    this.userInitials = this.buildInitials(this.displayName);
    this.loadDashboardData();
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
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudieron cargar los usuarios.');
        }
      });
  }

  loadProjects(): void {
    this.loading.set(true);
    this.error.set('');

    this.projectService.getAllProjects().pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (response) => {
        this.projects.set(response?.data ?? []);
      },
      error: (err: any) => {
        this.error.set(err?.error?.message ?? 'No se pudieron cargar los proyectos.');
      }
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
    const firstValid = values.find((value) => typeof value === 'string' && value.trim().length > 0) as string | undefined;
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
