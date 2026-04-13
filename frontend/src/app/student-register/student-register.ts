import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';

type StudentRow = {
  nombre: string;
  email: string;
};

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-register.html',
  styleUrl: './student-register.scss'
})
export class StudentRegisterComponent {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = signal(false);
  error = signal('');
  success = signal('');
  readonly recentStudents = signal<StudentRow[]>([]);

  goToHome(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.auth.logout();
  }

  onSubmit(): void {
    if (!this.nombre || !this.email || !this.password || !this.confirmPassword) {
      this.error.set('Completa todos los campos.');
      this.success.set('');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error.set('Las contraseñas no coinciden.');
      this.success.set('');
      return;
    }

    if (this.password.length < 6) {
      this.error.set('La contraseña debe tener al menos 6 caracteres.');
      this.success.set('');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    this.http.post<any>('/api/auth/register', {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    }).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: () => {
        this.recentStudents.update((items) => [
          { nombre: this.nombre, email: this.email },
          ...items
        ].slice(0, 5));
        this.success.set('Estudiante registrado correctamente.');
        this.nombre = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
      },
      error: (err: any) => {
        this.error.set(err?.error?.message ?? 'No se pudo registrar al estudiante.');
      }
    });
  }
}
