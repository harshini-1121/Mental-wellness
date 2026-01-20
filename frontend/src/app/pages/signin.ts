import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'signup-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="auth-container">
      <div class="auth-box">
        <h2>Sign Up</h2>
        <input [(ngModel)]="name" placeholder="Name" type="text">
        <input [(ngModel)]="email" placeholder="Email" type="email">
        <input [(ngModel)]="password" placeholder="Password" type="password">
        <button (click)="signup()">Sign Up</button>
        <p class="message">{{ message }}</p>
        <p class="redirect-text">
          Already have an account? 
          <a (click)="goToLogin()" class="link">Login</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container { display:flex; justify-content:center; align-items:center; height:80vh; }
    .auth-box { background:white; padding:2rem; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1); width:300px; text-align:center; }
    .auth-box h2 { margin-bottom:1rem; color:#6c63ff; }
    input { width:100%; padding:0.5rem; margin-bottom:1rem; border:1px solid #ccc; border-radius:4px; }
    button { width:100%; padding:0.5rem; background:#6c63ff; color:white; border:none; border-radius:4px; cursor:pointer; transition:0.3s; }
    button:hover { background:#574fcf; }
    .message { color:red; font-size:0.85rem; margin-top:0.5rem; }
    .redirect-text { margin-top:1rem; font-size:0.9rem; }
    .redirect-text .link { color:#6c63ff; cursor:pointer; text-decoration:underline; }
  `]
})
export class SigninPage {
  name = '';
  email = '';
  password = '';
  message = '';
  auth = inject(AuthService);
  router = inject(Router);

  signup() {
    this.auth.signup(this.name, this.email, this.password)
      .then(() => this.router.navigate(['/login']))
      .catch(err => this.message = err.message || 'Sign up failed');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}