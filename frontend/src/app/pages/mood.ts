// src/app/pages/mood.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'mood-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mood-container">
      <h2>Mood Tracker</h2>
      <div class="mood-buttons">
        <button 
          *ngFor="let mood of moods" 
          [disabled]="hasClickedToday" 
          (click)="setMood(mood)"
        >
          {{ mood }}
        </button>
      </div>

      <!-- Mood history only appears after first click -->
      <div class="mood-history" *ngIf="showHistory && moodHistory.length > 0">
        <h3>Your Mood History:</h3>
        <ul>
          <li *ngFor="let entry of moodHistory">
            {{ entry.date }} - {{ entry.mood }}
          </li>
        </ul>
      </div>

      <!-- Toast -->
      <div class="toast" *ngIf="toastMessage">{{ toastMessage }}</div>
    </div>
  `,
  styles: [`
    .mood-container { max-width: 500px; margin: 2rem auto; text-align: center; }
    .mood-buttons button { margin: 0.5rem; padding: 0.5rem 1rem; border-radius: 5px; border: none; cursor: pointer; font-size: 1rem; transition: transform 0.1s; }
    .mood-buttons button:active { transform: scale(0.95); }
    .mood-history { margin-top: 1rem; text-align: left; }
    .toast { 
      position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
      background: #6c63ff; color: white; padding: 1rem 1.5rem; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      opacity: 0.95; font-weight: bold; transition: opacity 0.3s ease-in-out;
    }
  `]
})
export class MoodPage {
  auth = inject(AuthService);
  moods = ['😊 Happy', '😢 Sad', '😡 Angry', '😐 Neutral'];
  moodHistory: { date: string, mood: string }[] = [];
  toastMessage: string | null = null;
  hasClickedToday = false;
  showHistory = false; // controls when history appears

  constructor() {
    const userId = this.auth.getToken() || 'guest';
    const savedAll = JSON.parse(localStorage.getItem('moods') || '{}');

    // Load current user's mood history
    this.moodHistory = savedAll[userId] || [];

    const today = new Date().toISOString().slice(0, 10);
    this.hasClickedToday = this.moodHistory.some(entry => entry.date === today);
  }

  setMood(mood: string) {
    if (this.hasClickedToday) return;

    const userId = this.auth.getToken() || 'guest';
    const today = new Date().toISOString().slice(0, 10);

    const savedAll = JSON.parse(localStorage.getItem('moods') || '{}');
    if (!savedAll[userId]) savedAll[userId] = [];

    savedAll[userId].push({ date: today, mood });
    localStorage.setItem('moods', JSON.stringify(savedAll));

    this.moodHistory.push({ date: today, mood });
    this.hasClickedToday = true;
    this.showHistory = true;

    this.showToast(`🎉 Mood "${mood}" recorded!`);
  }

  showToast(message: string) {
    this.toastMessage = message;
    setTimeout(() => this.toastMessage = null, 3000);
  }
}