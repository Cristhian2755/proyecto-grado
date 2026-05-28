import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MensajeChat {
  role: 'user' | 'model';
  parts: { text: string }[];
}

@Injectable({ providedIn: 'root' })
export class ChatIaService {
  private apiUrl = '/api/ai';

  constructor(private http: HttpClient) {}

  enviarMensaje(
    rol: 'estudiante' | 'docente' | 'coordinador' | 'biblioteca',
    mensaje: string,
    historial: MensajeChat[] = [],
  ): Observable<{ respuesta: string }> {
    return this.http.post<{ respuesta: string }>(`${this.apiUrl}/chat/${rol}`, { mensaje, historial });
  }
}
