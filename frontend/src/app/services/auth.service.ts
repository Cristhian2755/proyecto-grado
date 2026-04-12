import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private normalizeRole(role: string): string {
    return role
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  private toBaseRole(role: string): string {
    const normalized = this.normalizeRole(role);

    if (normalized.includes('administrador')) return 'administrador';
    if (normalized.includes('coordinador')) return 'coordinador';
    if (normalized.includes('estudiante')) return 'estudiante';
    if (normalized.includes('docente') || normalized.includes('asesor') || normalized.includes('jurado')) return 'docente';

    return normalized;
  }

  getStoredUser(): Record<string, unknown> | null {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  getUserRole(): string | null {
    const user = this.getStoredUser();
    if (!user || typeof user['rol'] !== 'string') {
      return null;
    }

    return this.toBaseRole(user['rol']);
  }

  getHomeRouteByRole(role?: string | null): string {
    const effectiveRole = role ? this.toBaseRole(role) : this.getUserRole();

    switch (effectiveRole) {
      case 'administrador':
        return '/home-administrador';
      case 'coordinador':
        return '/home-coordinador';
      case 'docente':
        return '/home-docente';
      case 'estudiante':
      default:
        return '/home-estudiante';
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  hasRole(roles: string | string[]): boolean {
    const userRole = this.getUserRole();
    if (!userRole) {
      return false;
    }

    if (typeof roles === 'string') {
      return userRole === this.toBaseRole(roles);
    }

    return roles.some((role) => userRole === this.toBaseRole(role));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}
