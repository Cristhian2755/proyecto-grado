import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs';

type ChatMessage = {
  kind: 'assistant' | 'user';
  text: string;
};

@Component({
  selector: 'app-document-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-chatbot.html',
  styleUrl: './document-chatbot.scss',
})
export class DocumentChatbotComponent implements OnChanges {
  private readonly http = inject(HttpClient);

  @Input() roleLabel = 'Usuario';
  @Input() documentUrl = '';
  @Input() documentName = '';

  readonly messages = signal<ChatMessage[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  userInput = '';

  constructor() {
    this.resetConversation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['documentUrl'] || changes['documentName'] || changes['roleLabel']) {
      this.resetConversation();
    }
  }

  sendMessage(): void {
    const question = this.userInput.trim();
    if (!question) {
      return;
    }

    if (!this.documentUrl) {
      this.error.set('Selecciona primero un documento para que pueda leerlo.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.error.set('No hay sesión activa.');
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const userMessage: ChatMessage = { kind: 'user', text: question };
    this.messages.set([...this.messages(), userMessage]);
    this.userInput = '';
    this.error.set('');
    this.loading.set(true);

    this.http
      .post<{ data?: { answer?: string } }>(`/api/ai/document-chat`, {
        documentUrl: this.documentUrl,
        documentName: this.documentName || 'documento',
        question,
        roleLabel: this.roleLabel,
      }, { headers })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          const answer = response?.data?.answer || 'No encontré información suficiente en el documento.';
          this.messages.set([...this.messages(), { kind: 'assistant', text: answer }]);
        },
        error: (err: any) => {
          this.error.set(err?.error?.message ?? 'No se pudo consultar el documento.');
        },
      });
  }

  private resetConversation(): void {
    this.messages.set([
      {
        kind: 'assistant',
        text: this.documentUrl
          ? `Asistente documental institucional. Se analizará "${this.documentName || 'el documento seleccionado'}" y se responderá con un tono formal y técnico.`
          : 'Seleccione un documento para iniciar la consulta documental.',
      },
    ]);
    this.error.set('');
    this.userInput = '';
    this.loading.set(false);
  }
}