import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';

type StudentRow = {
  id: number;
  nombre: string;
  email: string;
  rol: string;
};

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-register.html',
  styleUrl: './student-register.scss'
})
export class StudentRegisterComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  nombre = '';
  email = '';
  password = '';
  loading = signal(false);
  error = signal('');
  success = signal('');
  readonly students = signal<StudentRow[]>([]);
  editingStudentId: number | null = null;

  goToHome(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.auth.logout();
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.get<{ data: StudentRow[] }>('/api/auth/users?rol=estudiante', { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.students.set(response?.data ?? []);
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudieron cargar los estudiantes.');
        }
      });
  }

  startCreate(): void {
    this.resetForm();
  }

  startEdit(student: StudentRow): void {
    this.editingStudentId = student.id;
    this.nombre = student.nombre;
    this.email = student.email;
    this.password = '';
    this.error.set('');
    this.success.set('');
  }

  resetForm(): void {
    this.editingStudentId = null;
    this.nombre = '';
    this.email = '';
    this.password = '';
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

    if (this.editingStudentId) {
      this.updateStudent();
    } else {
      this.createStudent();
    }
  }

  createStudent(): void {
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

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.post<{ message: string; data: StudentRow }>('/api/auth/register', {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      rol: 'estudiante'
    }, { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.success.set(response?.message ?? 'Estudiante registrado correctamente.');
          this.resetForm();
          this.loadStudents();
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo registrar al estudiante.');
        }
      });
  }

  updateStudent(): void {
    if (!this.editingStudentId) return;

    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    const payload: any = {
      nombre: this.nombre,
      email: this.email
    };
    if (this.password) {
      payload.password = this.password;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.put<{ message: string; data: StudentRow }>(`/api/auth/users/${this.editingStudentId}`, payload, { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.success.set(response?.message ?? 'Estudiante actualizado correctamente.');
          this.resetForm();
          this.loadStudents();
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo actualizar al estudiante.');
        }
      });
  }

  deleteStudent(student: StudentRow): void {
    if (!window.confirm(`¿Eliminar al estudiante ${student.nombre}?`)) {
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
    this.http.delete<{ message: string }>(`/api/auth/users/${student.id}`, { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.success.set(response?.message ?? 'Estudiante eliminado correctamente.');
          if (this.editingStudentId === student.id) {
            this.resetForm();
          }
          this.loadStudents();
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo eliminar al estudiante.');
        }
      });
  }
}
