import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = signal(false);
  error = signal('');
  success = signal('');

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
      next: (response: any) => {
        this.success.set('Registro exitoso. Redirigiendo...');
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err: any) => {
        this.error.set(err?.error?.message ?? 'Error al registrarse.');
      }
    });
  }
}
