import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
// Update the path below to the correct location of AuthService
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'home-page',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.styles.css']
})
export class HomePage {
  auth: AuthService = inject(AuthService);
  chatMessage = '';

  newsList = [
    { image: 'assets/news/news1.jpeg', title: 'Wysa Acquires Kins', description: 'Accelerating patient access to clinically proven AI.' },
    { image: 'assets/news/news2.jpeg', title: 'MassMutual Free Access', description: 'Offering Wysa Assure to eligible policyowners.' },
    { image: 'assets/news/news3.jpeg', title: 'Responsible Generative AI', description: 'Insights on safely integrating AI into mental health.' },
    { image: 'assets/news/news4.jpeg', title: 'Colleagues in Crisis', description: 'Survey insights on workplace mental health.' },
    { image: 'assets/news/news5.jpeg', title: 'Personal Experience', description: 'Independent review of Wysa in the UK.' },
    { image: 'assets/news/news6.jpeg', title: 'April Health by Wysa', description: 'Expanding behavioral health access.' },
  ];

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }

  navigateTo(path: string) {
    if (!this.auth.isLoggedIn()) {
      this.auth.setRedirect(path);
      alert('Please login to access this page.');
      window.location.href = '/login';
      return;
    }
    window.location.href = path;
  }

  goToChat() {
    this.navigateTo('/chat');
  }
}
