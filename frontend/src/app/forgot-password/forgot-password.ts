import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPasswordComponent {
  private http = inject(HttpClient);
  email = '';
  loading = signal(false);
  error = signal('');
  success = signal('');
  submitted = signal(false);

  onSubmit(): void {
    if (!this.email) {
      this.error.set('Ingresa tu correo electrónico.');
      this.success.set('');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    this.http.post<any>('/api/auth/forgot-password', {
      email: this.email
    }).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (response: any) => {
        this.submitted.set(true);
        this.success.set(response.message ?? 'Revisa tu correo electrónico para restaurar tu contraseña.');
      },
      error: (err: any) => {
        this.error.set(err?.error?.message ?? 'Error al procesar la solicitud.');
      }
    });
  }
}
