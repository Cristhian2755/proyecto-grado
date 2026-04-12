import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Proyecto {
  id: number;
  titulo: string;
  problema: string;
  justificacion: string;
  objetivos: string;
  estudiante_id: number;
  estudiante_nombre: string;
  estudiante_email: string;
  linea_tematica_id: number;
  linea_tematica: string;
  rol: string;
  estado: string;
  revisor_id?: number;
  comentario?: string;
  aprobado?: boolean;
  fecha_revision?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = '/api/projects';

  constructor(private http: HttpClient) {}

  // Obtener todos los proyectos (admin/coordinador)
  getAllProjects(): Observable<{ data: Proyecto[] }> {
    return this.http.get<{ data: Proyecto[] }>(`${this.apiUrl}`);
  }

  // Obtener proyectos del estudiante autenticado
  getMyProjects(): Observable<{ data: Proyecto[] }> {
    return this.http.get<{ data: Proyecto[] }>(`${this.apiUrl}/my-projects`);
  }

  // Obtener proyectos asignados a un docente (como revisor)
  getMyAssignedProjects(): Observable<{ data: Proyecto[] }> {
    return this.http.get<{ data: Proyecto[] }>(`${this.apiUrl}/my-assigned-projects`);
  }

  // Obtener proyecto por ID
  getProjectById(id: number): Observable<{ data: Proyecto }> {
    return this.http.get<{ data: Proyecto }>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo proyecto
  createProject(project: Omit<Proyecto, 'id' | 'estudiante_nombre' | 'estudiante_email' | 'rol'>): Observable<{ data: Proyecto }> {
    return this.http.post<{ data: Proyecto }>(`${this.apiUrl}`, project);
  }

  // Actualizar proyecto
  updateProject(id: number, updates: Partial<Proyecto>): Observable<{ data: Proyecto }> {
    return this.http.put<{ data: Proyecto }>(`${this.apiUrl}/${id}`, updates);
  }

  // Eliminar proyecto
  deleteProject(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
