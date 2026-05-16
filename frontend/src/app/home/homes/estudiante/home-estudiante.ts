import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ProjectService, Proyecto } from '../../../services/project.service';

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
  readonly fileTypes = ['propuesta','cronograma','informe semana 6','anexos','asesorias','informe final'];
  readonly selectedFile = signal<string>(this.fileTypes[0]);

  selectFile(file: string): void {
    this.selectedFile.set(file);
  }

  goToUpload(): void {
    const carpeta = this.selectedFile();
    this.router.navigate(['/project-estudiante'], {
      queryParams: { carpeta }
    });
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
    this.loadMyProjects();
  }

  goToHome(path: string): void {
    this.router.navigate([path]);
  }

  goToProjectEstudiante(): void {
    this.router.navigate(['/project-estudiante']);
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
