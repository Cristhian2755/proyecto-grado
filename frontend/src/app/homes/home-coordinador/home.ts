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
  readonly activeTab = signal<'dashboard' | 'usuarios' | 'proyectos'>('dashboard');
  readonly executiveMetrics = signal<Array<{ label: string; value: string; icon: string }>>([]);

  constructor() {
    const user = this.auth.getStoredUser();
    this.displayName = this.getDisplayName(user);
    this.userInitials = this.buildInitials(this.displayName);
    this.loadDashboardData();
  }

  goToHome(path: string): void {
    this.router.navigate([path]);
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
        this.updateMetrics();
      },
      error: (err: any) => {
        this.error.set(err?.error?.message ?? 'No se pudieron cargar los proyectos.');
      }
    });
  }

  switchTab(tab: 'dashboard' | 'usuarios' | 'proyectos'): void {
    this.activeTab.set(tab);
  }

  private updateMetrics(): void {
    const projects = this.projects();
    const projectCount = projects.length;
    const userCount = this.users().filter(u => u.rol?.toLowerCase() === 'estudiante').length;
    
    this.executiveMetrics.set([
      { label: 'Proyectos Activos', value: projectCount.toString(), icon: '📁' },
      { label: 'Estudiantes Registrados', value: userCount.toString(), icon: '👥' },
      { label: 'Total Usuarios', value: this.users().length.toString(), icon: '⚖️' },
      { label: 'Proyectos en Propuesta', value: projects.filter(p => p.estado === 'propuesta').length.toString(), icon: '📈' }
    ]);
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
