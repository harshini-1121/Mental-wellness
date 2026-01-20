// src/app/pages/games/memory-flip.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Card {
  id: number;
  img: string;
  flipped: boolean;
  matched: boolean;
}

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  rotation: number;
  dRotation: number;
  shape: 'rect' | 'triangle';
}

@Component({
  selector: 'memory-flip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-container">
      <h2>🧠 Memory Flip Game</h2>
      <p *ngIf="matchedCount < cards.length / 2">Find all matching pairs!</p>

      <div class="grid">
        <div class="card" 
             *ngFor="let card of cards" 
             [ngClass]="{'flipped': card.flipped || card.matched}"
             (click)="flipCard(card)">
          <img class="front" [src]="card.img" alt="card image">
          <div class="back"></div>
        </div>
      </div>

      <button *ngIf="matchedCount === cards.length / 2" (click)="restart()">Play Again</button>
      <canvas *ngIf="showConfetti" id="confettiCanvas"></canvas>
    </div>
  `,
  styles: [`
    .game-container {
      max-width: 600px;
      margin: 2rem auto;
      text-align: center;
      font-family: 'Segoe UI', sans-serif;
    }

    h2 { color: #6c63ff; margin-bottom: 1rem; }

    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      justify-items: center;
      align-items: stretch;
      margin-bottom: 1rem;
    }

    .card {
      width: 100%;
      padding-top: 120%;
      position: relative;
      perspective: 1000px;
      cursor: pointer;
    }

    .card img.front,
    .card .back {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      border-radius: 8px;
      backface-visibility: hidden;
      transition: transform 0.5s;
      object-fit: cover;
    }

    .card.flipped .front { transform: rotateY(0deg); }
    .card.flipped .back  { transform: rotateY(180deg); }
    .card .back { background: #6c63ff; transform: rotateY(0deg); }

    button {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      border: none;
      background: #6c63ff;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }

    button:hover { background: #5a52d4; }

    canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  `]
})
export class MemoryFlip {
  cards: Card[] = [];
  flippedCards: Card[] = [];
  matchedCount = 0;
  showConfetti = false;

  private images = [
    'assets/games/1.png',
    'assets/games/2.png',
    'assets/games/3.png',
    'assets/games/4.png',
    'assets/games/5.png',
    'assets/games/6.jpg',
    'assets/games/7.png',
    'assets/games/8.png'
  ];

  constructor() {
    this.startGame();
  }

  startGame() {
    const cardPairs = [...this.images, ...this.images];
    this.cards = cardPairs
      .map((img, i) => ({ id: i, img, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    this.flippedCards = [];
    this.matchedCount = 0;
    this.showConfetti = false;
  }

  flipCard(card: Card) {
    if (card.flipped || card.matched || this.flippedCards.length === 2) return;
    card.flipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      setTimeout(() => this.checkMatch(), 800);
    }
  }

  checkMatch() {
    const [card1, card2] = this.flippedCards;
    if (card1.img === card2.img) {
      card1.matched = true;
      card2.matched = true;
      this.matchedCount++;
      if (this.matchedCount === this.images.length) {
        this.triggerConfetti();
      }
    } else {
      card1.flipped = false;
      card2.flipped = false;
    }
    this.flippedCards = [];
  }

  restart() {
    this.startGame();
  }

  triggerConfetti() {
    this.showConfetti = true;

    // Wait for canvas to render
    setTimeout(() => {
      const canvas = document.getElementById('confettiCanvas') as HTMLCanvasElement;
      const ctx = canvas?.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles: Particle[] = [];
      const colors = ['#ff0a54','#ff477e','#ff7096','#ff85a1','#fbb1b9','#f9bec7'];

      for (let i = 0; i < 200; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          dx: (Math.random() - 0.5) * 4,
          dy: Math.random() * 3 + 2,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          dRotation: Math.random() * 10 - 5,
          shape: Math.random() > 0.5 ? 'rect' : 'triangle'
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.x += p.dx;
          p.y += p.dy;
          p.rotation += p.dRotation;
          if (p.y > canvas.height) p.y = 0;

          ctx.fillStyle = p.color;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);

          if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          } else {
            ctx.beginPath();
            ctx.moveTo(0, -p.size / 2);
            ctx.lineTo(p.size / 2, p.size / 2);
            ctx.lineTo(-p.size / 2, p.size / 2);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        });
        requestAnimationFrame(animate);
      };

      animate();
      setTimeout(() => this.showConfetti = false, 5000);
    }, 50);
  }
}