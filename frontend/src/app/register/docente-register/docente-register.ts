import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, forkJoin, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

type BaseDocenteRow = {
  id: number;
  nombre: string;
  email: string;
  rol: string;
};

type DocenteRow = BaseDocenteRow & {
  esAsesor: boolean;
  esJurado: boolean;
};

@Component({
  selector: 'app-docente-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docente-register.html',
  styleUrl: './docente-register.scss'
})
export class DocenteRegisterComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  nombre = '';
  email = '';
  password = '';
  esAsesor: 'si' | 'no' = 'no';
  esJurado: 'si' | 'no' = 'no';
  loading = signal(false);
  error = signal('');
  success = signal('');
  readonly docentes = signal<DocenteRow[]>([]);
  editingDocenteId: number | null = null;

  goToHome(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.auth.logout();
  }

  ngOnInit(): void {
    this.loadDocentes();
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
    this.http.get<{ data: BaseDocenteRow[] }>('/api/auth/users?rol=docente', { headers })
      .pipe(
        switchMap((response) => {
          const docentesBase = response?.data ?? [];

          if (docentesBase.length === 0) {
            return of([] as DocenteRow[]);
          }

          const subrolesRequests = docentesBase.map((docente) =>
            this.http
              .get<{ data: { subroles: string[] } }>(`/api/auth/users/${docente.id}/subroles`, { headers })
              .pipe(
                map((subrolesResponse) => {
                  const subroles = subrolesResponse?.data?.subroles ?? [];
                  return {
                    ...docente,
                    esAsesor: subroles.includes('asesor'),
                    esJurado: subroles.includes('jurado')
                  };
                }),
                catchError(() =>
                  of({
                    ...docente,
                    esAsesor: false,
                    esJurado: false
                  })
                )
              )
          );

          return forkJoin(subrolesRequests);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (docentes) => {
          this.docentes.set(docentes);
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudieron cargar los docentes.');
        }
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
    this.esAsesor = docente.esAsesor ? 'si' : 'no';
    this.esJurado = docente.esJurado ? 'si' : 'no';
    this.error.set('');
    this.success.set('');
  }

  resetForm(): void {
    this.editingDocenteId = null;
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.esAsesor = 'no';
    this.esJurado = 'no';
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

  private buildSubroles(): string[] {
    const subroles: string[] = [];
    if (this.esAsesor === 'si') {
      subroles.push('asesor');
    }
    if (this.esJurado === 'si') {
      subroles.push('jurado');
    }
    return subroles;
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

    const subroles = this.buildSubroles();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.post<{ message: string; data: BaseDocenteRow }>('/api/auth/users', {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      rol: 'docente',
      subroles
    }, { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.success.set(response?.message ?? 'Docente registrado correctamente.');
          this.resetForm();
          this.loadDocentes();
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo registrar al docente.');
        }
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

    const subroles = this.buildSubroles();
    const payload: any = {
      nombre: this.nombre,
      email: this.email,
      rol: 'docente',
      subroles
    };

    if (this.password) {
      payload.password = this.password;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.put<{ message: string; data: BaseDocenteRow }>(`/api/auth/users/${this.editingDocenteId}`, payload, { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.success.set(response?.message ?? 'Docente actualizado correctamente.');
          this.resetForm();
          this.loadDocentes();
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo actualizar al docente.');
        }
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
    this.http.delete<{ message: string }>(`/api/auth/users/${docente.id}`, { headers })
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
        }
      });
  }
}
