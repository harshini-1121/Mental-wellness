import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface Event {
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  isRegistered: boolean;
}

@Component({
  selector: 'events-page',
  standalone: true,
  imports: [CommonModule, NgFor],
  template: `
    <div class="events-container">
      <h2>Upcoming Events</h2>
      <div class="events-grid" *ngIf="events.length; else noEvents">
        <div class="event-card" *ngFor="let event of events">
          <div class="event-image">
            <img [src]="'assets/events/' + event.image" alt="{{ event.title }}">
          </div>
          <div class="event-info">
            <h3>{{ event.title }}</h3>
            <p>{{ event.description }}</p>
            <p><strong>Date:</strong> {{ event.date | date:'medium' }}</p>
            <p><strong>Location:</strong> {{ event.location }}</p>
            <button [disabled]="event.isRegistered" (click)="register(event)">
              {{ event.isRegistered ? 'Registered' : 'Register' }}
            </button>
          </div>
        </div>
      </div>
      <ng-template #noEvents>
        <p style="text-align:center; color:#666;">No upcoming events at the moment.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .events-container { max-width: 1100px; margin: 2rem auto; padding: 1rem; }
    h2 { text-align: center; color: #6c63ff; margin-bottom: 2rem; font-size: 2.2rem; font-weight: 700; }

    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.8rem;
    }

    .event-card {
      background: #fff;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 8px 20px rgba(0,0,0,0.12);
      display: flex;
      flex-direction: column;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .event-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.2);
    }

    .event-image img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .event-card:hover .event-image img {
      transform: scale(1.05);
    }

    .event-info {
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .event-info h3 {
      margin: 0;
      font-size: 1.4rem;
      color: #333;
    }

    .event-info p {
      margin: 0;
      color: #555;
      font-size: 0.95rem;
    }

    button {
      margin-top: 0.7rem;
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      background: #6c63ff;
      color: white;
      font-weight: 600;
      transition: background 0.3s;
      align-self: flex-start;
    }

    button:hover:not([disabled]) { background: #5a52d4; }
    button[disabled] { background: gray; cursor: not-allowed; }

    @media (max-width: 900px) {
      .events-grid { grid-template-columns: 1fr; }
    }

    @media (max-width: 500px) {
      .events-container { padding: 0.5rem; }
      .event-info h3 { font-size: 1.2rem; }
      .event-info p { font-size: 0.9rem; }
      button { padding: 0.5rem 1rem; font-size: 0.9rem; }
    }
  `]
})
export class EventsPage implements OnInit {
  events: Event[] = [];
  auth: AuthService = inject(AuthService);

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      alert('Please login to see events');
      window.location.href = '/login';
      return;
    }

    this.loadEvents();
  }

  loadEvents() {
    const allEvents: Event[] = [
      { title: 'Morning Yoga', image: 'event1.jpg', description: 'Start your day with energy.', date: '2025-10-20T07:00:00', location: 'Community Park', isRegistered: false },
      { title: 'Mindfulness Workshop', image: 'event2.jpg', description: 'Learn to be present.', date: '2025-10-26T10:00:00', location: 'Wellness Center', isRegistered: false },
      { title: 'Cooking Class', image: 'event3.jpg', description: 'Healthy meals made easy.', date: '2025-11-10T15:00:00', location: 'Community Kitchen', isRegistered: false },
      { title: 'Morning Walk', image: 'event4.jpg', description: 'Walk and enjoy nature.', date: '2025-10-19T06:30:00', location: 'City Park', isRegistered: false },
      { title: 'Art Therapy', image: 'event5.jpg', description: 'Relax through creativity.', date: '2025-10-27T14:00:00', location: 'Art Studio', isRegistered: false },
      { title: 'Open Mic Night', image: 'event6.jpg', description: 'Express yourself in a safe space.', date: '2025-10-18T18:00:00', location: 'Wellness Center', isRegistered: false },
    ];

    const now = new Date();
    const upcoming = allEvents.filter(e => new Date(e.date) >= now);

    const registered = JSON.parse(localStorage.getItem('registeredEvents') || '[]');

    this.events = upcoming.map(e => ({
      ...e,
      isRegistered: registered.includes(e.title)
    }));
  }

  register(event: Event) {
    event.isRegistered = true;

    const registered = JSON.parse(localStorage.getItem('registeredEvents') || '[]');
    if (!registered.includes(event.title)) registered.push(event.title);
    localStorage.setItem('registeredEvents', JSON.stringify(registered));

    alert(`You have registered for "${event.title}"!`);
  }
}