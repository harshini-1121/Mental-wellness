// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private redirectPath: string | null = null;
  private apiUrl = 'http://localhost:4000/auth'; // Backend auth routes

  constructor(private http: HttpClient) {}

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }

  // Store redirect path for after login
  setRedirect(path: string) {
    this.redirectPath = path;
  }

  // Retrieve redirect path
  getRedirect(): string | null {
    return this.redirectPath;
  }

  // Login
  async login(email: string, password: string): Promise<void> {
    const response: any = await firstValueFrom(
      this.http.post(`${this.apiUrl}/login`, { email, password })
    );
    localStorage.setItem('userToken', response.token);
  }

  // Signup
  async signup(name: string, email: string, password: string): Promise<void> {
    const response: any = await firstValueFrom(
      this.http.post(`${this.apiUrl}/signup`, { name, email, password })
    );
    localStorage.setItem('userToken', response.token);
  }

  // Logout
  logout(): void {
    localStorage.removeItem('userToken');
    this.redirectPath = null;
    window.location.href = '/'; // Redirect home after logout
  }

  // Get auth headers for API requests
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken') || '';
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // Get current token
  getToken(): string | null {
    return localStorage.getItem('userToken');
  }
}