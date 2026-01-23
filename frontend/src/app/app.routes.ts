import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { ChatPage } from './pages/chat';
import { EventsPage } from './pages/events/events';
import { MoodPage } from './pages/mood';
import { MusicPage } from './pages/music';
import { LoginPage } from './pages/login';
import { SigninPage } from './pages/signin';
import { GamesPage } from './pages/games/games-page';
import { MemoryFlip } from './pages/games/memory-flip';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'chat', component: ChatPage },
  { path: 'events', component: EventsPage },
  { path: 'mood', component: MoodPage },
  { path: 'music', component: MusicPage },
  { path: 'login', component: LoginPage },
  { path: 'signin', component: SigninPage },
  { path: 'games', component: GamesPage },
  { path: 'memory-flip', component: MemoryFlip },
];