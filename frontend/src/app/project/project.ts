import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ProjectService, Proyecto } from '../services/project.service';

type ProjectListRow = Proyecto & {
  asesor_nombre?: string;
  jurados_nombres?: string[];
};

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.html',
  styleUrl: './project.scss'
})
export class ProjectComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly projectService = inject(ProjectService);

  readonly displayName: string;
  readonly userInitials: string;
  readonly projects = signal<ProjectListRow[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');

  constructor() {
    const user = this.auth.getStoredUser();
    this.displayName = this.getDisplayName(user);
    this.userInitials = this.buildInitials(this.displayName);
    this.loadProjects();
  }

  goToHome(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.auth.logout();
  }

  loadProjects(): void {
    this.loading.set(true);
    this.error.set('');

    this.projectService
      .getAllProjects()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          const rows = (response?.data ?? []) as ProjectListRow[];
          this.projects.set(
            rows.map((project) => ({
              ...project,
              asesor_nombre: project.asesor_nombre ?? 'Por asignar',
              jurados_nombres: project.jurados_nombres ?? ['Por asignar']
            }))
          );
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudieron cargar los proyectos.');
        }
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
