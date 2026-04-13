import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-home-administrador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-administrador.html',
  styleUrl: './home-administrador.scss'
})
export class HomeAdministradorComponent {
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
  readonly success = signal('');
  readonly activeTab = signal<'usuarios' | 'proyectos'>('usuarios');

  nombre = '';
  email = '';
  password = '';
  rol = 'estudiante';
  editingUserId: number | null = null;

  readonly allowedRoles = ['administrador', 'coordinador', 'estudiante', 'docente', 'asesor', 'jurado'];

  constructor() {
    const user = this.auth.getStoredUser();
    this.displayName = this.getDisplayName(user);
    this.userInitials = this.buildInitials(this.displayName);
    this.loadUsers();
    this.loadProjects();
  }

  goToHome(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.auth.logout();
  }

  startCreate(): void {
    this.resetForm();
  }

  startEdit(user: UserRow): void {
    this.editingUserId = user.id;
    this.nombre = user.nombre;
    this.email = user.email;
    this.password = '';
    this.rol = user.rol.toLowerCase();
    this.error.set('');
    this.success.set('');
  }

  resetForm(): void {
    this.editingUserId = null;
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.rol = 'estudiante';
  }

  submitForm(): void {
    if (!this.nombre || !this.email || !this.rol) {
      this.error.set('Completa nombre, email y rol.');
      this.success.set('');
      return;
    }

    if (!this.editingUserId && !this.password) {
      this.error.set('La contraseña es obligatoria para crear un usuario.');
      this.success.set('');
      return;
    }

    // Para edición, solo envía campos que hayan cambiado
    if (this.editingUserId) {
      const payload: any = {
        nombre: this.nombre,
        email: this.email,
        rol: this.rol
      };
      // Solo envía contraseña si no está vacía
      if (this.password) {
        payload.password = this.password;
      }
      this.updateUser(this.editingUserId, payload);
      return;
    }

    // Para creación, todos los campos son requeridos
    const payload = {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      rol: this.rol
    };

    this.createUser(payload);
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

  createUser(payload: { nombre: string; email: string; password: string; rol: string }): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http
      .post<{ message: string; data: UserRow }>('/api/auth/users', payload, { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.success.set(response?.message ?? 'Usuario creado correctamente.');
          this.resetForm();
          this.loadUsers();
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo crear el usuario.');
        }
      });
  }

  updateUser(id: number, payload: { nombre: string; email: string; rol: string; password?: string }): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http
      .put<{ message: string; data: UserRow }>(`/api/auth/users/${id}`, payload, { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.success.set(response?.message ?? 'Usuario actualizado correctamente.');
          this.resetForm();
          this.loadUsers();
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo actualizar el usuario.');
        }
      });
  }

  deleteUser(user: UserRow): void {
    if (!window.confirm(`¿Eliminar al usuario ${user.nombre}?`)) {
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
    this.http
      .delete<{ message: string }>(`/api/auth/users/${user.id}`, { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.success.set(response?.message ?? 'Usuario eliminado correctamente.');
          if (this.editingUserId === user.id) {
            this.resetForm();
          }
          this.loadUsers();
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo eliminar el usuario.');
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

  switchTab(tab: 'usuarios' | 'proyectos'): void {
    this.activeTab.set(tab);
  }

  updateRole(user: UserRow, role: string): void {
    if (!role || role.toLowerCase() === user.rol.toLowerCase()) {
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
    this.http
      .put<{ message: string; data: UserRow }>(`/api/auth/users/${user.id}/role`, { rol: role }, { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.success.set(response?.message ?? 'Rol actualizado correctamente.');
          this.users.set(this.users().map((u) => (u.id === user.id ? { ...u, rol: role } : u)));
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo actualizar el rol.');
        }
      });
  }

  private getDisplayName(user: Record<string, unknown> | null): string {
    const values = [user?.['nombre'], user?.['name'], user?.['fullName'], user?.['email']];
    const firstValid = values.find((value) => typeof value === 'string' && value.trim().length > 0) as string | undefined;
    return firstValid?.trim() || 'Administrador';
  }

  private buildInitials(text: string): string {
    const tokens = text.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return 'AD';
    if (tokens.length === 1) return tokens[0].slice(0, 2).toUpperCase();
    return (tokens[0][0] + tokens[1][0]).toUpperCase();
  }
}
