import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ProjectService, Proyecto } from '../../services/project.service';

@Component({
  selector: 'app-home-estudiante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-estudiante.html',
  styleUrl: './home-estudiante.scss'
})
export class HomeEstudianteComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly projectService = inject(ProjectService);

  readonly displayName: string;
  readonly userInitials: string;
  readonly myProjects = signal<Proyecto[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');

  constructor() {
    const user = this.auth.getStoredUser();
    this.displayName = this.getDisplayName(user);
    this.userInitials = this.buildInitials(this.displayName);
    this.loadMyProjects();
  }

  goToHome(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.auth.logout();
  }

  loadMyProjects(): void {
    this.loading.set(true);
    this.error.set('');

    this.projectService.getMyProjects().pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (response) => {
        this.myProjects.set(response?.data ?? []);
      },
      error: (err: any) => {
        this.error.set(err?.error?.message ?? 'No se pudieron cargar tus proyectos.');
      }
    });
  }

  private getDisplayName(user: Record<string, unknown> | null): string {
    const values = [user?.['nombre'], user?.['name'], user?.['fullName'], user?.['email']];
    const firstValid = values.find((value) => typeof value === 'string' && value.trim().length > 0) as string | undefined;
    return firstValid?.trim() || 'Estudiante';
  }

  private buildInitials(text: string): string {
    const tokens = text.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return 'ES';
    if (tokens.length === 1) return tokens[0].slice(0, 2).toUpperCase();
    return (tokens[0][0] + tokens[1][0]).toUpperCase();
  }
}
