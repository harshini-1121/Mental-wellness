import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="auth-container">
      <div class="auth-box">
        <h2>Login</h2>
        <input [(ngModel)]="email" placeholder="Email" type="email">
        <input [(ngModel)]="password" placeholder="Password" type="password">
        <button (click)="login()">Login</button>
        <p class="message">{{ message }}</p>
        <p class="redirect-text">
          Don't have an account? 
          <a (click)="goToSignup()" class="link">Sign Up</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display:flex;
      justify-content:center;
      align-items:center;
      height:80vh;
      background:#f0f2f5;
    }
    .auth-box {
      background:white;
      padding:2rem;
      border-radius:8px;
      box-shadow:0 6px 20px rgba(0,0,0,0.1);
      width:320px;
      text-align:center;
    }
    .auth-box h2 {
      margin-bottom:1.5rem;
      color:#6c63ff;
      font-size:1.8rem;
    }
    input {
      width:100%;
      padding:0.6rem;
      margin-bottom:1rem;
      border:1px solid #ccc;
      border-radius:4px;
      font-size:1rem;
    }
    button {
      width:100%;
      padding:0.6rem;
      background:#6c63ff;
      color:white;
      border:none;
      border-radius:4px;
      cursor:pointer;
      font-size:1rem;
      transition:0.3s;
    }
    button:hover { background:#574fcf; }
    .message {
      color:red;
      font-size:0.85rem;
      margin-top:0.5rem;
    }
    .redirect-text {
      margin-top:1rem;
      font-size:0.9rem;
    }
    .redirect-text .link {
      color:#6c63ff;
      cursor:pointer;
      text-decoration:underline;
    }
  `]
})
export class LoginPage {
  email = '';
  password = '';
  message = '';
  auth = inject(AuthService);
  router = inject(Router);

  login() {
    this.auth.login(this.email, this.password)
      .then(() => {
        const redirect = this.auth.getRedirect();
        this.auth.setRedirect('');
        this.router.navigate([redirect || '/']);
      })
      .catch(err => this.message = err.message || 'Login failed');
  }

  goToSignup() {
    this.router.navigate(['/signin']);
  }
}