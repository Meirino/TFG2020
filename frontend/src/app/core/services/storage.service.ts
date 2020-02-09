import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Session} from '../models/session.model';
import {User} from '../models/user.model';

@Injectable()
export class StorageService {

  private localStorageService;
  private currentSession: Session = null;
  private bot = new User('AI', 'AI@bot.com', 'bot');

  constructor(private router: Router) {
    // Se usa el navegador para guardar la información de sesión
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  get getBot(): User {
    return this.bot;
  }

  setCurrentSession(session: Session) {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): Session {
    // Se comprueba si existe una sesión/usuario ya guardada
    const sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? JSON.parse(sessionStr) as Session : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession() {
    this.localStorageService.removeItem('currentUser');
    this.localStorageService.clear();
    this.currentSession = null;
  }

  getCurrentUser(): User {
    const session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null);
  }

  getCurrentToken(): string {
    const session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  }

  logout() {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
