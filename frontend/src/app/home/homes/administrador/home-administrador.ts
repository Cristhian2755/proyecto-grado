import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ProjectService, Proyecto } from '../../../services/project.service';

type UserRow = {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  carrera_id?: number | null;
  carrera_nombre?: string | null;
  subroles?: string[];
};

type CarreraRow = {
  id: number;
  nombre: string;
  facultad?: string | null;
};

@Component({
  selector: 'app-home-administrador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-administrador.html',
  styleUrl: './home-administrador.scss',
})
export class HomeAdministradorComponent {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly projectService = inject(ProjectService);

  readonly displayName: string;
  readonly userInitials: string;
  readonly users = signal<UserRow[]>([]);
  readonly carreras = signal<CarreraRow[]>([]);
  readonly projects = signal<Proyecto[]>([]);
  readonly loading = signal(false);
  readonly projectLoading = signal(false);
  readonly error = signal('');
  readonly success = signal('');
  readonly activeTab = signal<'usuarios' | 'proyectos'>('usuarios');
  readonly searchPlaceholder = computed(() =>
    this.activeTab() === 'usuarios' ? 'usuarios' : 'proyectos',
  );
  readonly filteredUsers = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) {
      return this.users();
    }

    return this.users().filter((user) => {
      const values = [user.nombre, user.email, user.rol].join(' ').toLowerCase();
      return values.includes(query);
    });
  });

  readonly filteredProjects = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) {
      return this.projects();
    }

    return this.projects().filter((project) => {
      const values = [
        project.titulo,
        project.estudiante_nombre,
        project.linea_tematica,
        project.estado,
        project.estudiante_email,
      ]
        .join(' ')
        .toLowerCase();

      return values.includes(query);
    });
  });

  searchQuery = signal('');

  nombre = '';
  email = '';
  password = '';
  rol = '';
  subrol = '';
  carreraId = '';
  editingUserId: number | null = null;

  readonly allowedRoles = [
    'administrador',
    'coordinador',
    'estudiante',
    'docente',
    'asesor',
    'jurado',
  ];
  readonly roleOptions = ['estudiante', 'docente', 'coordinador', 'administrador'];
  readonly subroleOptions = ['asesor', 'jurado'];

  constructor() {
    const user = this.auth.getStoredUser();
    this.displayName = this.getDisplayName(user);
    this.userInitials = this.buildInitials(this.displayName);
    this.loadCarreras();
    this.loadUsers();
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
    this.activeTab.set('usuarios');
    this.editingUserId = user.id;
    this.nombre = user.nombre;
    this.email = user.email;
    this.password = '';
    this.rol = user.rol.toLowerCase();
    this.subrol = this.rol === 'docente' ? (user.subroles?.[0] ?? '') : '';
    this.carreraId = user.carrera_id ? String(user.carrera_id) : '';
    this.error.set('');
    this.success.set('');
  }

  resetForm(): void {
    this.editingUserId = null;
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.rol = 'estudiante';
    this.subrol = '';
    this.carreraId = '';
  }

  onRoleChange(role: string): void {
    this.rol = role;
    if (role !== 'docente') {
      this.subrol = '';
    }
  }

  switchTab(tab: 'usuarios' | 'proyectos'): void {
    this.activeTab.set(tab);

    if (tab === 'proyectos') {
      this.loadProjects();
    }
  }

  submitForm(): void {
    if (!this.nombre || !this.email || !this.rol) {
      this.error.set('Completa nombre, email y rol.');
      this.success.set('');
      return;
    }

    if (this.rol === 'docente' && !this.subrol) {
      this.error.set('Selecciona un sub rol para docente.');
      this.success.set('');
      return;
    }

    if (!this.editingUserId && !this.password) {
      this.error.set('La contraseña es obligatoria para crear un usuario.');
      this.success.set('');
      return;
    }

    const selectedCarreraId = this.carreraId ? Number(this.carreraId) : null;
    if (this.carreraId && Number.isNaN(selectedCarreraId)) {
      this.error.set('Selecciona un programa válido.');
      this.success.set('');
      return;
    }

    // Para edición, solo envía campos que hayan cambiado
    if (this.editingUserId) {
      const payload: any = {
        nombre: this.nombre,
        email: this.email,
        rol: this.rol,
        carrera_id: selectedCarreraId,
      };
      // Solo envía contraseña si no está vacía
      if (this.password) {
        payload.password = this.password;
      }
      // Enviar subroles si el rol es docente
      if (this.rol === 'docente') {
        payload.subroles = this.subrol ? [this.subrol] : [];
      }
      this.updateUser(this.editingUserId, payload);
      return;
    }

    // Para creación, todos los campos son requeridos
    const payload: any = {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      rol: this.rol,
      carrera_id: selectedCarreraId,
    };
    if (this.rol === 'docente') {
      payload.subroles = this.subrol ? [this.subrol] : [];
    }

    this.createUser(payload);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  loadCarreras(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.get<{ data: CarreraRow[] }>('/api/auth/carreras', { headers }).subscribe({
      next: (response) => {
        this.carreras.set(response?.data ?? []);
      },
      error: (err: any) => {
        this.error.set(err?.error?.message ?? 'No se pudieron cargar los programas.');
      },
    });
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
          this.users.set(
            (response?.data ?? []).map((user) => ({
              ...user,
              carrera_nombre: user.carrera_nombre ?? 'Sin programa',
              subroles: user.subroles ?? [],
            })),
          );
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudieron cargar los usuarios.');
        },
      });
  }

  loadProjects(): void {
    this.projectLoading.set(true);
    this.error.set('');

    this.projectService
      .getAllProjects()
      .pipe(finalize(() => this.projectLoading.set(false)))
      .subscribe({
        next: (response) => {
          const rows = (response?.data ?? []) as Proyecto[];
          this.projects.set(
            rows.map((project) => ({
              ...project,
              estudiante_nombre: project.estudiante_nombre || 'Sin asignar',
              linea_tematica: project.linea_tematica || 'No especificada',
              estudiante_email: project.estudiante_email || '-',
              estado: project.estado || 'Pendiente',
            })),
          );
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudieron cargar los proyectos.');
        },
      });
  }

  createUser(payload: {
    nombre: string;
    email: string;
    password: string;
    rol: string;
    carrera_id: number | null;
  }): void {
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
        },
      });
  }

  updateUser(
    id: number,
    payload: {
      nombre: string;
      email: string;
      rol: string;
      carrera_id: number | null;
      password?: string;
    },
  ): void {
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
        },
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
        },
      });
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
      .put<{ message: string; data: UserRow }>(
        `/api/auth/users/${user.id}/role`,
        { rol: role },
        { headers },
      )
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.success.set(response?.message ?? 'Rol actualizado correctamente.');
          this.users.set(this.users().map((u) => (u.id === user.id ? { ...u, rol: role } : u)));
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo actualizar el rol.');
        },
      });
  }

  private getDisplayName(user: Record<string, unknown> | null): string {
    const values = [user?.['nombre'], user?.['name'], user?.['fullName'], user?.['email']];
    const firstValid = values.find(
      (value) => typeof value === 'string' && value.trim().length > 0,
    ) as string | undefined;
    return firstValid?.trim() || 'Administrador';
  }

  private buildInitials(text: string): string {
    const tokens = text.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return 'AD';
    if (tokens.length === 1) return tokens[0].slice(0, 2).toUpperCase();
    return (tokens[0][0] + tokens[1][0]).toUpperCase();
  }
}
