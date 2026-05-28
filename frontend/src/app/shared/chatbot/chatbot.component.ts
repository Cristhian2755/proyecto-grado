import { Component } from '@angular/core';
import { ChatIaService, MensajeChat } from '../../services/chat-ia.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent {
  rol: 'estudiante' | 'docente' | 'coordinador' | 'biblioteca' = 'estudiante';
  nuevoMensaje = '';
  cargando = false;
  historial: MensajeChat[] = [];

  constructor(private chatService: ChatIaService) {}

  enviar() {
    const texto = this.nuevoMensaje?.trim();
    if (!texto) return;

    // Añadir mensaje del usuario al historial local
    this.historial.push({ role: 'user', parts: [{ text: texto }] });
    this.nuevoMensaje = '';
    this.cargando = true;

    this.chatService.enviarMensaje(this.rol, texto, this.historial).subscribe({
      next: (res) => {
        this.historial.push({ role: 'model', parts: [{ text: res.respuesta }] });
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error en chat:', err);
        this.historial.push({ role: 'model', parts: [{ text: 'No fue posible procesar la consulta. Intente nuevamente.' }] });
        this.cargando = false;
      },
    });
  }
}
