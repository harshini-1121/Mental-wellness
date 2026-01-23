import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, NgIf],
  template: `
    <h2>Register</h2>
    <form (ngSubmit)="register()">
      <input [(ngModel)]="name" name="name" placeholder="Name" required />
      <input [(ngModel)]="email" name="email" placeholder="Email" required />
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p *ngIf="message">{{ message }}</p>
  `
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  message = '';

  constructor(private http: HttpClient) {}

  register() {
    this.http.post('http://localhost:4000/api/auth/register', {
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => this.message = 'Registered successfully!',
      error: err => this.message = err.error?.error || 'Registration failed'
    });
  }
}