import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ProjectService, Proyecto } from '../../../services/project.service';

interface Docente {
  id: number;
  nombre: string;
  email: string;
  rol_principal: string;
}

interface FileOption {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-home-docente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-docente.html',
  styleUrl: './home-docente.scss'
})
export class HomeDocenteComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly projectService = inject(ProjectService);

  readonly searchTerm = signal('');
  readonly selectedFile = signal<string>('propuesta');
  readonly selectedDocente = signal<Docente | null>(null);
  readonly docentes = signal<Docente[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');

  readonly fileOptions: FileOption[] = [
    { id: 'propuesta', nombre: 'propuesta' },
    { id: 'cronograma', nombre: 'cronograma' },
    { id: 'informe-semana-6', nombre: 'informe semana 6' },
    { id: 'anexos', nombre: 'anexos' },
    { id: 'asesorias', nombre: 'asesorías' },
    { id: 'informe-final', nombre: 'informe final' }
  ];

  readonly filteredDocentes = computed(() => {
    const search = this.searchTerm().toLowerCase();
    return this.docentes().filter(d => 
      d.nombre.toLowerCase().includes(search) || 
      d.email.toLowerCase().includes(search)
    );
  });

  constructor() {
    this.loadDocentes();
  }

  loadDocentes(): void {
    this.loading.set(true);
    this.error.set('');

    this.projectService.getMyAssignedProjects().pipe(
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: (response: any) => {
        const docentes: Docente[] = [];
        const seenIds = new Set<number>();

        // Extraer docentes únicos de los proyectos
        if (Array.isArray(response?.data)) {
          response.data.forEach((project: any) => {
            // Si hay información del revisor/docente en el proyecto
            if (project.revisor_id && !seenIds.has(project.revisor_id)) {
              seenIds.add(project.revisor_id);
              docentes.push({
                id: project.revisor_id,
                nombre: project.revisor_nombre || `Revisor ${project.revisor_id}`,
                email: project.revisor_email || 'sin-email@iser.edu.co',
                rol_principal: 'docente'
              });
            }
          });
        }

        // Si no hay docentes, agregar algunos de prueba
        if (docentes.length === 0) {
          docentes.push(
            { id: 1, nombre: 'María García', email: 'maria@iser.edu.co', rol_principal: 'docente' },
            { id: 2, nombre: 'Juan López', email: 'juan@iser.edu.co', rol_principal: 'docente' },
            { id: 3, nombre: 'Carlos Martín', email: 'carlos@iser.edu.co', rol_principal: 'docente' },
            { id: 4, nombre: 'Ana Rodríguez', email: 'ana@iser.edu.co', rol_principal: 'docente' },
            { id: 5, nombre: 'Pedro Sánchez', email: 'pedro@iser.edu.co', rol_principal: 'docente' }
          );
        }

        this.docentes.set(docentes);
        if (docentes.length > 0) {
          this.selectedDocente.set(docentes[0]);
        }
      },
      error: (err: any) => {
        this.error.set(err?.error?.message ?? 'Error al cargar docentes');
        // Agregar datos de prueba en caso de error
        const testDocentes: Docente[] = [
          { id: 1, nombre: 'María García', email: 'maria@iser.edu.co', rol_principal: 'docente' },
          { id: 2, nombre: 'Juan López', email: 'juan@iser.edu.co', rol_principal: 'docente' },
          { id: 3, nombre: 'Carlos Martín', email: 'carlos@iser.edu.co', rol_principal: 'docente' },
          { id: 4, nombre: 'Ana Rodríguez', email: 'ana@iser.edu.co', rol_principal: 'docente' },
          { id: 5, nombre: 'Pedro Sánchez', email: 'pedro@iser.edu.co', rol_principal: 'docente' }
        ];
        this.docentes.set(testDocentes);
        if (testDocentes.length > 0) {
          this.selectedDocente.set(testDocentes[0]);
        }
      }
    });
  }

  selectFile(fileId: string): void {
    this.selectedFile.set(fileId);
  }

  selectDocente(docente: Docente): void {
    this.selectedDocente.set(docente);
  }

  logout(): void {
    this.auth.logout();
  }
}
