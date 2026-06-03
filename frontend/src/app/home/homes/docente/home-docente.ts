import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
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
  readonly carpetaOptions = [
    'propuesta',
    'cronograma',
    'informe semana 6',
    'anexos',
    'asesoria',
    'informe final',
  ];
  readonly selectedCarpeta = signal<string>(this.carpetaOptions[0]);

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
}
