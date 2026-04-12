import { CommonModule } from '@angular/common';
import { Component, signal, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss'
})
export class ResetPasswordComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  password = '';
  confirmPassword = '';
  loading = signal(false);
  error = signal('');
  success = signal('');
  token = '';
  validToken = signal(false);
  tokenChecked = signal(false);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      if (this.token) {
        this.verifyToken();
      } else {
        this.tokenChecked.set(true);
        this.error.set('Token no válido. Solicita un nuevo enlace de recuperación.');
      }
    });
  }

  verifyToken(): void {
    this.http.get<any>(`/api/auth/verify-token?token=${this.token}`)
      .subscribe({
        next: () => {
          this.validToken.set(true);
          this.tokenChecked.set(true);
        },
        error: () => {
          this.tokenChecked.set(true);
          this.error.set('El enlace ha expirado o no es válido.');
        }
      });
  }

  onSubmit(): void {
    if (!this.password || !this.confirmPassword) {
      this.error.set('Completa ambos campos.');
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

    this.http.post<any>('/api/auth/reset-password', {
      token: this.token,
      password: this.password
    }).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (response: any) => {
        this.success.set('Contraseña actualizada. Redirigiendo al login...');
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err: any) => {
        this.error.set(err?.error?.message ?? 'Error al cambiar la contraseña.');
      }
    });
  }
}
