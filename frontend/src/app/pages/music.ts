import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'music-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="music-container">
      <h2>🎧 Relax & Rewind</h2>

      <div class="music-list">
        <div 
          class="music-card" 
          *ngFor="let track of tracks; let i = index"
          [ngStyle]="{'background': gradients[i % gradients.length]}"
        >
          <div class="info">
            <h3>{{ track.title }}</h3>
            <p>{{ track.artist }}</p>
          </div>
          <audio 
            controls 
            [src]="track.url"
            (play)="pauseOthers($event)"
          ></audio>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .music-container {
      max-width: 900px;
      margin: 2rem auto;
      text-align: center;
      padding: 1rem;
    }

    h2 {
      color: #6c63ff;
      margin-bottom: 2rem;
      font-size: 1.8rem;
    }

    .music-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .music-card {
      border-radius: 15px;
      padding: 1rem 1.5rem;
      color: white;
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      transition: transform 0.2s ease;
    }

    .music-card:hover {
      transform: translateY(-5px);
    }

    .info h3 {
      margin: 0;
      font-size: 1.3rem;
      font-weight: bold;
    }

    .info p {
      margin: 4px 0 10px 0;
      opacity: 0.9;
      font-size: 0.95rem;
    }

    audio {
      width: 100%;
      border-radius: 10px;
      outline: none;
    }
  `]
})
export class MusicPage implements OnInit {
  tracks = [
    { title: 'Golden Hour', artist: 'JVKE', url: 'assets/music/music1.mp3' },
    { title: 'Evening Improvisation Ethera', artist: 'Spheria Royalty', url: 'assets/music/music2.mp3' },
    { title: 'Echoes in Blue', artist: 'Tokyo Music Walker', url: 'assets/music/music3.mp3' },
    { title: 'Walker Day Off', artist: 'Night Tunes', url: 'assets/music/music4.mp3' },
    { title: 'Cruel Summer', artist: 'Taylor Swift', url: 'assets/music/music5.mp3' },
    { title: '10000 Hours', artist: 'Jeon Jungkook (BTS)', url: 'assets/music/music6.mp3' },
    { title: 'lover', artist: 'Taylor Swift', url: 'assets/music/music7.mp3' },
    { title: 'Die with smile', artist: 'Lady Gaga', url: 'assets/music/music8.mp3' },
    { title: 'Short Meditation', artist: 'The Weeknd', url: 'assets/music/music9.mp3' },
    { title: 'Flute Meditation', artist: 'Subhash Jena', url: 'assets/music/music10.mp3' }

  ];

  gradients = [
    'linear-gradient(135deg, #6c63ff, #8a80ff)',
    'linear-gradient(135deg, #ff6b6b, #f06595)',
    'linear-gradient(135deg, #38b2ac, #319795)',
    'linear-gradient(135deg, #f6ad55, #ed8936)',
    'linear-gradient(135deg, #4299e1, #3182ce)',
    'linear-gradient(135deg, #9f7aea, #805ad5)',
    'linear-gradient(135deg, #ed64a6, #d53f8c)',
    'linear-gradient(135deg, #68d391, #48bb78)',
    'linear-gradient(135deg, #4fd1c5, #38b2ac)',
    'linear-gradient(135deg, #fbb6ce, #f687b3)'
  ];

  ngOnInit() {}

  // Ensures only one song plays at a time 🎧
  pauseOthers(event: any) {
    const currentAudio = event.target;
    const allAudios = document.querySelectorAll('audio');
    allAudios.forEach(audio => {
      if (audio !== currentAudio) {
        (audio as HTMLAudioElement).pause();
      }
    });
  }
}