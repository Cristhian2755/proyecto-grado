import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  protected readonly title = signal('Plataforma de Proyectos ISER');
  protected readonly apiStatus = signal('Verificando conexion con backend...');

  ngOnInit(): void {
    this.http.get<{ status: string; database: string }>('/health').subscribe({
      next: (response) => {
        this.apiStatus.set(`Backend ${response.status} - BD ${response.database}`);
      },
      error: () => {
        this.apiStatus.set('No fue posible conectar con el backend en http://localhost:5001');
      }
    });
  }
}
