import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BibliotecaCatalogItem {
  id: number;
  titulo: string;
  estudiante_nombre: string;
  linea_tematica: string;
  estado: string;
  problema: string;
  documentName: string;
  documentUrl: string;
  fecha_revision?: string;
}

export interface BibliotecaDocumentChatResponse {
  message?: string;
  data?: {
    documentName?: string;
    markdown?: string;
    markdownPath?: string | null;
    suggestions?: string[];
    answer?: string;
    suggestedDocuments?: BibliotecaCatalogItem[];
  };
}

@Injectable({ providedIn: 'root' })
export class BibliotecaService {
  private readonly apiUrl = '/api/ai/biblioteca';

  constructor(private readonly http: HttpClient) {}

  getCatalogo(): Observable<{ message?: string; data: BibliotecaCatalogItem[] }> {
    return this.http.get<{ message?: string; data: BibliotecaCatalogItem[] }>(`${this.apiUrl}/catalog`);
  }

  consultarDocumento(
    documentUrl: string,
    documentName: string,
    question: string,
  ): Observable<BibliotecaDocumentChatResponse> {
    const body: { documentName: string; question: string; documentUrl?: string } = {
      documentName,
      question,
    };

    if (documentUrl) {
      body.documentUrl = documentUrl;
    }

    return this.http.post<BibliotecaDocumentChatResponse>(`${this.apiUrl}/document-chat`, body);
  }
}
