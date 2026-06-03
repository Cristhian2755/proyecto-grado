import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BibliotecaCatalogItem, BibliotecaService } from '../../services/biblioteca.service';

type ChatMessage = {
  kind: 'assistant' | 'user';
  text: string;
};

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnChanges {
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() documentUrl = '';
  @Input() documentName = '';
  @Output() suggestedProjectSelected = new EventEmitter<BibliotecaCatalogItem>();

  messages: ChatMessage[] = [];
  nuevoMensaje = '';
  cargando = false;
  error = '';
  suggestedProjects: BibliotecaCatalogItem[] = [];

  constructor(private readonly bibliotecaService: BibliotecaService) {
    this.resetConversation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['documentUrl'] || changes['documentName']) {
      this.resetConversation();
    }
  }

  enviar(): void {
    const pregunta = this.nuevoMensaje.trim();
    if (!pregunta) return;

    this.messages = [...this.messages, { kind: 'user', text: pregunta }];
    this.nuevoMensaje = '';
    this.error = '';
    this.cargando = true;

    this.bibliotecaService.consultarDocumento(this.documentUrl, this.documentName || 'documento', pregunta).subscribe({
      next: (response) => {
        const answer = response?.data?.answer || 'No fue posible generar una respuesta para el documento seleccionado.';
        this.messages = [...this.messages, { kind: 'assistant', text: answer }];
        this.suggestedProjects = response?.data?.suggestedDocuments ?? [];
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error en chat de biblioteca:', err);
        this.error = err?.error?.message ?? 'No fue posible procesar la consulta.';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  selectSuggestedProject(project: BibliotecaCatalogItem): void {
    this.suggestedProjectSelected.emit(project);
  }

  private resetConversation(): void {
    this.messages = [
      {
        kind: 'assistant',
        text: this.documentUrl
          ? `Asistente de biblioteca activo. Se consultará "${this.documentName || 'el documento seleccionado'}".`
          : 'Asistente de biblioteca listo. Pregunta por un tema y te sugeriré proyectos del catálogo.',
      },
    ];
    this.nuevoMensaje = '';
    this.error = '';
    this.cargando = false;
    this.suggestedProjects = [];
  }
}
