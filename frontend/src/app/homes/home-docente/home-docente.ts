import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ProjectService, Proyecto } from '../../services/project.service';

@Component({
  selector: 'app-home-docente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-docente.html',
  styleUrl: './home-docente.scss'
})
export class HomeDocenteComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly projectService = inject(ProjectService);

  readonly displayName: string;
  readonly userInitials: string;
  readonly assignedProjects = signal<Proyecto[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');

  constructor() {
    const user = this.auth.getStoredUser();
    this.displayName = this.getDisplayName(user);
    this.userInitials = this.buildInitials(this.displayName);
    this.loadAssignedProjects();
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

    this.projectService.getMyAssignedProjects().pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (response) => {
        this.assignedProjects.set(response?.data ?? []);
      },
      error: (err: any) => {
        this.error.set(err?.error?.message ?? 'No se pudieron cargar tus proyectos asignados.');
      }
    });
  }

  private getDisplayName(user: Record<string, unknown> | null): string {
    const values = [user?.['nombre'], user?.['name'], user?.['fullName'], user?.['email']];
    const firstValid = values.find((value) => typeof value === 'string' && value.trim().length > 0) as string | undefined;
    return firstValid?.trim() || 'Docente';
  }

  private buildInitials(text: string): string {
    const tokens = text.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return 'DO';
    if (tokens.length === 1) return tokens[0].slice(0, 2).toUpperCase();
    return (tokens[0][0] + tokens[1][0]).toUpperCase();
  }
}
