// src/app/pages/games/games-page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Game {
  title: string;
  description: string;
  route: string;
  image: string;
}

@Component({
  selector: 'games-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="games-container">
      <h2>🎮 Fun & Wellness Games</h2>
      <div class="games-grid">
        <div class="game-card" *ngFor="let game of games">
          <img [src]="game.image" alt="{{ game.title }}">
          <div class="game-info">
            <h3>{{ game.title }}</h3>
            <p>{{ game.description }}</p>
            <a [routerLink]="game.route">Play Now</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .games-container { max-width: 1000px; margin: 2rem auto; padding: 1rem; }
    h2 { text-align: center; color: #6c63ff; margin-bottom: 2rem; font-size: 2rem; }

    .games-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .game-card {
      background: #f5f7fa;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 15px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
    }

    .game-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }

    .game-card img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }

    .game-info {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .game-info h3 { margin: 0; color: #333; font-size: 1.25rem; }
    .game-info p { margin: 0; color: #555; font-size: 0.95rem; }

    .game-info a {
      margin-top: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      text-align: center;
      background: #6c63ff;
      color: white;
      font-weight: bold;
      text-decoration: none;
      transition: background 0.2s;
    }

    .game-info a:hover { background: #5a52d4; }

    @media (max-width: 650px) {
      .games-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class GamesPage {
  games: Game[] = [
    {
      title: 'Memory Flip',
      description: 'Test your memory and find matching pairs!',
      route: '/memory-flip',
      image: 'assets/games/memory.png', // Use the first game image as cover
    },
    // Add more games here
  ];
}