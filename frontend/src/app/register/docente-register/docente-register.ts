import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { map, catchError, finalize, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';

type BaseDocenteRow = {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  carrera_id?: number | null;
  carrera_nombre?: string | null;
};

type DocenteRow = BaseDocenteRow;

@Component({
  selector: 'app-docente-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docente-register.html',
  styleUrl: './docente-register.scss',
})
export class DocenteRegisterComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  nombre = '';
  email = '';
  password = '';
  loading = signal(false);
  error = signal('');
  success = signal('');
  readonly coordinatorProgramName = signal('Programa del coordinador');
  readonly coordinatorCareerId = signal<number | null>(null);
  readonly carreras = signal<Array<{ id: number; nombre: string }>>([]);
  carreraId = '';
  readonly docentes = signal<DocenteRow[]>([]);
  editingDocenteId: number | null = null;

  goToHome(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.auth.logout();
  }

  ngOnInit(): void {
    this.loadCoordinatorProgram();
    this.loadCarreras();
    this.loadDocentes();
  }

  loadCarreras(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http
      .get<{ data: Array<{ id: number; nombre: string }> }>('/api/auth/carreras', { headers })
      .subscribe({
        next: (response) => {
          this.carreras.set(response?.data ?? []);
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudieron cargar los programas.');
        },
      });
  }

  private resolveStoredNumber(user: Record<string, unknown> | null, key: string): number | null {
    const value = user?.[key];

    if (value === null || value === undefined || value === '') {
      return null;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  private resolveStoredString(user: Record<string, unknown> | null, key: string): string {
    const value = user?.[key];
    return typeof value === 'string' ? value.trim() : '';
  }

  private loadCoordinatorProgram(): void {
    const storedUser = this.auth.getStoredUser();
    const storedCareerName = this.resolveStoredString(storedUser, 'carrera_nombre');
    const storedCareerId = this.resolveStoredNumber(storedUser, 'carrera_id');

    if (storedCareerName && storedCareerId !== null) {
      this.coordinatorProgramName.set(storedCareerName);
      this.coordinatorCareerId.set(storedCareerId);
      return;
    }

    const currentUserId = this.resolveStoredNumber(storedUser, 'id');
    const token = localStorage.getItem('token');

    if (!token || currentUserId === null) {
      this.coordinatorProgramName.set(storedCareerName || 'Programa del coordinador');
      this.coordinatorCareerId.set(storedCareerId);
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http
      .get<{
        data: Array<{ id: number; carrera_id?: number | null; carrera_nombre?: string | null }>;
      }>('/api/auth/users?rol=coordinador', { headers })
      .pipe(
        map((response) => response?.data?.find((user) => user.id === currentUserId) ?? null),
        catchError(() => of(null)),
      )
      .subscribe((coordinator) => {
        const programName = coordinator?.carrera_nombre?.trim();
        this.coordinatorProgramName.set(
          programName || storedCareerName || 'Programa del coordinador',
        );
        this.coordinatorCareerId.set(coordinator?.carrera_id ?? storedCareerId ?? null);
      });
  }

  loadDocentes(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http
      .get<{ data: BaseDocenteRow[] }>('/api/auth/users?rol=docente', { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.docentes.set(response?.data ?? []);
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudieron cargar los docentes.');
        },
      });
  }

  startCreate(): void {
    this.resetForm();
  }

  startEdit(docente: DocenteRow): void {
    this.editingDocenteId = docente.id;
    this.nombre = docente.nombre;
    this.email = docente.email;
    this.password = '';
    this.carreraId = docente.carrera_id ? String(docente.carrera_id) : '';
    this.error.set('');
    this.success.set('');
  }

  resetForm(): void {
    this.editingDocenteId = null;
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.carreraId = '';
  }

  generateTemporaryPassword(): void {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let generated = '';

    for (let i = 0; i < 12; i++) {
      generated += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    this.password = generated;
    this.error.set('');
  }

  onSubmit(): void {
    if (!this.nombre || !this.email) {
      this.error.set('Completa nombre y correo.');
      this.success.set('');
      return;
    }

    if (this.editingDocenteId) {
      this.updateDocente();
    } else {
      this.createDocente();
    }
  }

  createDocente(): void {
    if (!this.password) {
      this.error.set('Genera una contraseña temporal.');
      this.success.set('');
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

    const selectedCarreraRaw =
      this.carreraId ||
      (this.coordinatorCareerId() !== null ? String(this.coordinatorCareerId()) : '');
    if (!selectedCarreraRaw) {
      this.loading.set(false);
      this.error.set('Selecciona un programa.');
      return;
    }

    const selectedCarreraId = Number(selectedCarreraRaw);
    if (Number.isNaN(selectedCarreraId)) {
      this.loading.set(false);
      this.error.set('Selecciona un programa válido.');
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http
      .post<{ message: string; data: BaseDocenteRow }>(
        '/api/auth/users',
        {
          nombre: this.nombre,
          email: this.email,
          password: this.password,
          rol: 'docente',
          carrera_id: selectedCarreraId,
        },
        { headers },
      )
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.success.set(response?.message ?? 'Docente registrado correctamente.');
          this.resetForm();
          this.loadDocentes();
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo registrar al docente.');
        },
      });
  }

  updateDocente(): void {
    if (!this.editingDocenteId) return;

    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    const selectedCarreraRaw =
      this.carreraId ||
      (this.coordinatorCareerId() !== null ? String(this.coordinatorCareerId()) : '');
    if (!selectedCarreraRaw) {
      this.loading.set(false);
      this.error.set('Selecciona un programa.');
      return;
    }

    const selectedCarreraId = Number(selectedCarreraRaw);
    if (Number.isNaN(selectedCarreraId)) {
      this.loading.set(false);
      this.error.set('Selecciona un programa válido.');
      return;
    }

    const payload: any = {
      nombre: this.nombre,
      email: this.email,
      rol: 'docente',
      carrera_id: selectedCarreraId,
    };

    if (this.password) {
      payload.password = this.password;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http
      .put<{ message: string; data: BaseDocenteRow }>(
        `/api/auth/users/${this.editingDocenteId}`,
        payload,
        { headers },
      )
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.success.set(response?.message ?? 'Docente actualizado correctamente.');
          this.resetForm();
          this.loadDocentes();
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo actualizar al docente.');
        },
      });
  }

  deleteDocente(docente: DocenteRow): void {
    if (!window.confirm(`¿Eliminar al docente ${docente.nombre}?`)) {
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
      .delete<{ message: string }>(`/api/auth/users/${docente.id}`, { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.success.set(response?.message ?? 'Docente eliminado correctamente.');
          if (this.editingDocenteId === docente.id) {
            this.resetForm();
          }
          this.loadDocentes();
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo eliminar al docente.');
        },
      });
  }
}
