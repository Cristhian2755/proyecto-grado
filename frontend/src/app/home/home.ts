import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService, Proyecto } from '../services/project.service';

type ChatMessage = {
  text: string;
  kind: 'assistant' | 'user';
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  private readonly projectService = inject(ProjectService);
  private readonly router = inject(Router);

  private readonly approvedStates = new Set(['APROBADO', 'APROBADO_DOCENTE']);

  searchQuery = '';
  userInput = '';
  selectedProject: Proyecto | null = null;
  allProjects: Proyecto[] = [];
  filteredProjects: Proyecto[] = [];
  chatMessages: ChatMessage[] = [];
  selectedProblem = '';

  constructor() {
    this.loadProjects();
    this.initializeChatbot();
  }

  private loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (response: { data?: Proyecto[] }) => {
        this.allProjects = (response?.data ?? []).filter(project => this.isApprovedProject(project));
        this.filteredProjects = [...this.allProjects];

        if (this.filteredProjects.length > 0) {
          this.selectProject(this.filteredProjects[0]);
        } else {
          this.selectProject(null);
        }
      },
      error: (err: unknown) => {
        console.error('Error loading projects:', err);
        this.allProjects = [];
        this.filteredProjects = [];
        this.selectProject(null);
      }
    });
  }

  private initializeChatbot(): void {
    this.chatMessages = [
      {
        kind: 'assistant',
        text: 'Hola. Soy el asistente de la biblioteca pública. Puedes buscar por título, tema, autor o palabra clave.'
      }
    ];
  }

  filterProjects(): void {
    if (!this.searchQuery.trim()) {
      this.filteredProjects = [...this.allProjects];
    } else {
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredProjects = this.allProjects.filter(project =>
        this.matchesQuery(project, query)
      );
    }

    if (
      this.selectedProject !== null &&
      !this.filteredProjects.some(project => project.id === this.selectedProject?.id)
    ) {
      this.selectProject(this.filteredProjects[0] ?? null);
    }
  }

  selectProject(project: Proyecto | null): void {
    this.selectedProject = project;
    this.selectedProblem = project?.problema ?? '';
  }

  sendMessage(): void {
    if (!this.userInput.trim()) return;

    const question = this.userInput.trim();
    this.chatMessages.push({ kind: 'user', text: question });

    setTimeout(() => {
      const botResponse = this.generateBotResponse(question);
      this.chatMessages.push({ kind: 'assistant', text: botResponse });

      const suggestedProject = this.findProjectByQuery(question);
      if (suggestedProject) {
        this.selectProject(suggestedProject);
        this.chatMessages.push({
          kind: 'assistant',
          text: `Encontré el proyecto "${suggestedProject.titulo}". Ya lo dejé abierto en la lectura principal.`
        });
      }
    }, 500);
    
    this.userInput = '';
  }

  suggestQuery(query: string): void {
    this.searchQuery = query;
    this.filterProjects();
  }

  private generateBotResponse(input: string): string {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('ia') || lowerInput.includes('inteligencia artificial')) {
      return 'Tengo varios proyectos de Inteligencia Artificial disponibles. Uno destacado es "Sistema de Recomendación Académica usando Machine Learning" desarrollado por Juan Pérez.';
    }
    
    if (lowerInput.includes('web') || lowerInput.includes('aplicación')) {
      return 'En la sección de aplicaciones web tenemos proyectos como "Plataforma de E-learning para Instituciones Educativas" y "Sistema de Gestión Hospitalaria".';
    }
    
    if (lowerInput.includes('seguridad') || lowerInput.includes('ciber')) {
      return 'Los proyectos de seguridad informática incluyen "Sistema de Detección de Intrusiones basado en IA" y "Plataforma de Análisis de Vulnerabilidades".';
    }
    
    if (lowerInput.includes('embebidos') || lowerInput.includes('iot')) {
      return 'Para sistemas embebidos y IoT, tenemos proyectos como "Sistema de Monitoreo Ambiental IoT" y "Controlador Inteligente para Invernaderos".';
    }
    
    return 'Buscando proyectos relacionados con tu consulta. Prueba con términos como IA, web, seguridad, salud o redes.';
  }

  private findProjectByQuery(input: string): Proyecto | null {
    const lowerInput = input.toLowerCase().trim();
    if (!lowerInput) return null;

    return this.allProjects.find(project => 
      this.textValue(project.titulo).includes(lowerInput) ||
      this.textValue(project.estudiante_nombre).includes(lowerInput) ||
      this.textValue(project.linea_tematica).includes(lowerInput) ||
      this.textValue(project.problema).includes(lowerInput) ||
      this.textValue(project.justificacion).includes(lowerInput)
    ) || null;
  }

  private textValue(value: string | null | undefined): string {
    return (value ?? '').toLowerCase();
  }

  private matchesQuery(project: Proyecto, query: string): boolean {
    return (
      this.textValue(project.titulo).includes(query) ||
      this.textValue(project.estudiante_nombre).includes(query) ||
      this.textValue(project.linea_tematica).includes(query) ||
      this.textValue(project.problema).includes(query) ||
      this.textValue(project.justificacion).includes(query)
    );
  }

  private isApprovedProject(project: Proyecto): boolean {
    return this.approvedStates.has(project.estado.toUpperCase());
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  viewDetails(): void {
    // En una implementación real, esto navegaría a una vista de detalles del proyecto
    alert(`Mostrando detalles completos del proyecto: ${this.selectedProject?.titulo}`);
  }

  downloadDocument(): void {
    // En una implementación real, esto descargaría el documento del proyecto
    alert(`Descargando documento del proyecto: ${this.selectedProject?.titulo}`);
  }
}
