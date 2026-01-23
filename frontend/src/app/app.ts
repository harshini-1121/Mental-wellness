import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <header class="app-header">
      <div class="logo">🧠 Wellness</div>
      <nav>
        <a routerLink="/">Home</a>
        <a (click)="navigate('/chat')">Chat AI</a>
        <a (click)="navigate('/events')">Events</a>
        <a (click)="navigate('/mood')">Mood Tracker</a>
        <a (click)="navigate('/music')">Music</a>
        <a (click)="navigate('/games')">Games</a>
      </nav>
      <div class="auth-area">
        <a *ngIf="!auth.isLoggedIn()" (click)="navigate('/login')">Login</a>
        <button *ngIf="auth.isLoggedIn()" (click)="logout()">Logout</button>
      </div>
    </header>

    <router-outlet></router-outlet>

    <!-- Logout Confirmation Modal -->
    <div class="modal-backdrop" *ngIf="showLogoutModal">
      <div class="modal-box">
        <p>Do you really want to log out?</p>
        <div class="modal-buttons">
          <button (click)="confirmLogout()">Yes</button>
          <button (click)="cancelLogout()">No</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-header { display:flex; justify-content:space-between; align-items:center; padding:1rem; background:#6c63ff; color:white; }
    nav a { margin-right:1rem; cursor:pointer; color:white; text-decoration:none; }
    .auth-area a, .auth-area button { cursor:pointer; color:white; background:none; border:none; margin-left:1rem; }
    .auth-area button { background:white; color:#6c63ff; padding:0.25rem 0.5rem; border-radius:4px; }

    /* Modal Styles */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display:flex;
      justify-content:center;
      align-items:center;
      z-index: 1000;
    }
    .modal-box {
      background:white;
      padding:2rem;
      border-radius:10px;
      text-align:center;
      box-shadow:0 4px 20px rgba(0,0,0,0.2);
      max-width: 300px;
      width: 90%;
    }
    .modal-box p {
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      color: #333;
    }
    .modal-buttons button {
      margin: 0 0.5rem;
      padding:0.5rem 1rem;
      border:none;
      border-radius:5px;
      cursor:pointer;
      background:#6c63ff;
      color:white;
      font-weight: bold;
      transition: background 0.3s;
    }
    .modal-buttons button:hover { background:#574fcf; }
  `]
})
export class App {
  auth = inject(AuthService);
  router = inject(Router);

  showLogoutModal = false;

  navigate(path: string) {
    if (!this.auth.isLoggedIn()) {
      this.auth.setRedirect(path);
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate([path]);
  }

  logout() {
    this.showLogoutModal = true;
  }

  confirmLogout() {
    this.showLogoutModal = false;
    this.auth.logout();
    this.router.navigate(['/']);
  }

  cancelLogout() {
    this.showLogoutModal = false;
  }
}