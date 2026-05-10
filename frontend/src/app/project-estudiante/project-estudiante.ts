import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ProjectService, Proyecto } from '../services/project.service';

type EntregaRow = {
  id: number;
  archivo: string;
  fecha_entrega: string;
  version: number;
  url_descarga?: string;
  nombre_original?: string;
};

@Component({
  selector: 'app-project-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-estudiante.html',
  styleUrl: './project-estudiante.scss'
})
export class ProjectEstudianteComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly projectService = inject(ProjectService);

  readonly displayName: string;
  readonly userInitials: string;
  readonly project = signal<Proyecto | null>(null);
  readonly entregas = signal<EntregaRow[]>([]);
  readonly showProjectForm = signal(false);
  readonly editingProject = signal(false);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly success = signal('');

  titulo = '';
  problema = '';
  objetivos = '';
  justificacion = '';
  selectedFiles: File[] = [];

  constructor() {
    const user = this.auth.getStoredUser();
    this.displayName = this.getDisplayName(user);
    this.userInitials = this.buildInitials(this.displayName);
    this.loadProject();
  }

  goToHome(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.auth.logout();
  }

  loadProject(): void {
    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    this.projectService
      .getMyProjects()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          const rows = response?.data ?? [];
          const myProject = rows.length > 0 ? rows[0] : null;
          this.project.set(myProject);

          if (myProject) {
            this.showProjectForm.set(false);
            this.loadEntregas(myProject.id);
          } else {
            this.entregas.set([]);
            this.showProjectForm.set(true);
            this.editingProject.set(false);
          }
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo cargar tu proyecto.');
        }
      });
  }

  crearProyecto(): void {
    this.editingProject.set(false);
    this.showProjectForm.set(true);
    this.titulo = '';
    this.problema = '';
    this.objetivos = '';
    this.justificacion = '';
    this.error.set('');
    this.success.set('');
  }

  editarProyecto(): void {
    const current = this.project();
    if (!current) {
      return;
    }

    this.editingProject.set(true);
    this.showProjectForm.set(true);
    this.titulo = current.titulo || '';
    this.problema = current.problema || '';
    this.objetivos = current.objetivos || '';
    this.justificacion = current.justificacion || '';
    this.error.set('');
    this.success.set('');
  }

  cancelarFormulario(): void {
    this.showProjectForm.set(false);
    this.error.set('');
  }

  guardarProyecto(): void {
    if (!this.titulo.trim()) {
      this.error.set('Completa el titulo del proyecto.');
      return;
    }

    const current = this.project();
    const problemaValue = this.problema.trim() || current?.problema?.trim() || 'Pendiente de definir en documento adjunto.';
    const objetivosValue = this.objetivos.trim() || current?.objetivos?.trim() || 'Pendiente de definir en documento adjunto.';
    const justificacionValue = this.justificacion.trim() || current?.justificacion?.trim() || problemaValue;

    const payload: any = {
      titulo: this.titulo.trim(),
      problema: problemaValue,
      objetivos: objetivosValue,
      justificacion: justificacionValue
    };

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    const request$ = this.editingProject() && current
      ? this.projectService.updateProject(current.id, payload)
      : this.projectService.createProject(payload);

    request$.pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (response: any) => {
        this.success.set(this.editingProject() ? 'Proyecto actualizado correctamente.' : 'Proyecto creado correctamente.');
        const savedProject = response?.data as Proyecto | undefined;
        if (savedProject) {
          this.project.set(savedProject);
          this.loadEntregas(savedProject.id);
        }
        this.showProjectForm.set(false);
        this.editingProject.set(false);
        this.loadProject();
      },
      error: (err: any) => {
        this.error.set(err?.error?.message ?? 'No se pudo guardar el proyecto.');
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFiles = input.files ? Array.from(input.files) : [];
  }

  subirEntrega(): void {
    const current = this.project();
    if (!current) {
      this.error.set('Debes crear un proyecto antes de subir entregas.');
      return;
    }

    if (this.selectedFiles.length === 0) {
      this.error.set('Selecciona uno o varios archivos antes de subir la entrega.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const uploads = this.selectedFiles.map((file) => {
      const formData = new FormData();
      formData.append('proyecto_id', String(current.id));
      formData.append('archivo', file);
      return this.http.post<{ message: string; data: EntregaRow }>('/api/entregas/upload', formData, { headers });
    });

    forkJoin(uploads)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (responses) => {
          const total = responses.length;
          this.success.set(`${total} archivo(s) subidos correctamente.`);
          this.selectedFiles = [];
          this.loadEntregas(current.id);
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo subir la entrega.');
        }
      });
  }

  loadEntregas(projectId: number): void {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.get<{ data: EntregaRow[] }>(`/api/entregas/proyecto/${projectId}`, { headers }).subscribe({
      next: (response) => {
        this.entregas.set(response?.data ?? []);
      },
      error: () => {
        this.entregas.set([]);
      }
    });
  }

  verDocumento(entrega?: EntregaRow): void {
    const target = entrega || this.entregas()[0];
    const url = target?.url_descarga;
    if (url) {
      window.open(url, '_blank');
    }
  }

  private getDisplayName(user: Record<string, unknown> | null): string {
    const values = [user?.['nombre'], user?.['name'], user?.['fullName'], user?.['email']];
    const firstValid = values.find((value) => typeof value === 'string' && value.trim().length > 0) as string | undefined;
    return firstValid?.trim() || 'Estudiante';
  }

  private buildInitials(text: string): string {
    const tokens = text.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) {
      return 'ES';
    }

    if (tokens.length === 1) {
      return tokens[0].slice(0, 2).toUpperCase();
    }

    return (tokens[0][0] + tokens[1][0]).toUpperCase();
  }
}
