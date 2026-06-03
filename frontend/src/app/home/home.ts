import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from '../shared/chatbot/chatbot.component';
import { Router } from '@angular/router';
import { BibliotecaCatalogItem, BibliotecaService } from '../services/biblioteca.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type CatalogItem = BibliotecaCatalogItem;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatbotComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  private readonly bibliotecaService = inject(BibliotecaService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sanitizer = inject(DomSanitizer);

  searchQuery = '';
  catalogLoading = true;
  selectedProject: CatalogItem | null = null;
  readingMode = false;
  documentReaderUrl: SafeResourceUrl | null = null;
  allProjects: CatalogItem[] = [];
  filteredProjects: CatalogItem[] = [];
  selectedProblem = '';

  constructor() {
    this.loadCatalog();
  }

  private loadCatalog(): void {
    this.catalogLoading = true;
    this.bibliotecaService.getCatalogo().subscribe({
      next: (response) => {
        this.allProjects = response?.data ?? [];
        this.filteredProjects = [...this.allProjects];

        this.selectProject(null);

        this.catalogLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: unknown) => {
        console.error('Error loading library catalog:', err);
        this.allProjects = [];
        this.filteredProjects = [];
        this.selectProject(null);
        this.catalogLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  filterProjects(): void {
    if (!this.searchQuery.trim()) {
      this.filteredProjects = [...this.allProjects];
    } else {
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredProjects = this.allProjects.filter((project) => this.matchesQuery(project, query));
    }

    if (
      this.selectedProject !== null &&
      !this.filteredProjects.some((project) => project.id === this.selectedProject?.id)
    ) {
      this.selectProject(null);
    }
  }

  selectProject(project: CatalogItem | null): void {
    this.selectedProject = project;
    this.selectedProblem = project?.problema ?? '';
    this.documentReaderUrl = project?.documentUrl?.trim()
      ? this.sanitizer.bypassSecurityTrustResourceUrl(project.documentUrl.trim())
      : null;
    if (!project) {
      this.readingMode = false;
    }
  }

  selectSuggestedProject(project: CatalogItem): void {
    const match = this.allProjects.find(
      (item) => item.id === project.id || item.documentName === project.documentName,
    );

    if (match) {
      this.selectProject(match);
      return;
    }

    this.selectProject(project);
  }

  suggestQuery(query: string): void {
    this.searchQuery = query;
    this.filterProjects();
  }

  private textValue(value: string | null | undefined): string {
    return (value ?? '').toLowerCase();
  }

  private matchesQuery(project: CatalogItem, query: string): boolean {
    return (
      this.textValue(project.titulo).includes(query) ||
      this.textValue(project.estudiante_nombre).includes(query) ||
      this.textValue(project.linea_tematica).includes(query) ||
      this.textValue(project.problema).includes(query) ||
      this.textValue(project.documentName).includes(query)
    );
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  openReader(): void {
    if (!this.selectedProject) return;

    this.readingMode = true;
  }

  backToCatalog(): void {
    this.readingMode = false;
  }

  viewDetails(): void {
    if (!this.selectedProject) return;

    const details = [
      `Título: ${this.selectedProject.titulo}`,
      `Autor: ${this.selectedProject.estudiante_nombre}`,
      `Archivo: ${this.selectedProject.documentName}`,
      `Resumen: ${this.selectedProject.problema}`,
    ].join('\n');

    alert(details);
  }

  downloadDocument(): void {
    if (!this.selectedProject) return;
    window.open(this.selectedProject.documentUrl, '_blank', 'noopener,noreferrer');
  }
}
