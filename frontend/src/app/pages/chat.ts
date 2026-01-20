import { Component, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="chat-container">
      <div class="header">
        <h2>💬 AI Chat Assistant</h2>
        <button class="new-chat-btn" (click)="clearChat()">New Chat</button>
      </div>

      <div class="chat-box" #chatBox>
        <div *ngFor="let msg of messages" [@fadeIn]
             class="message"
             [ngClass]="{ user: msg.sender === 'You', bot: msg.sender !== 'You' }">
          <div class="bubble">
            <b *ngIf="msg.sender !== 'You'">🌙 </b>{{ msg.text }}
          </div>
        </div>

        <div class="typing" *ngIf="isBotTyping">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span> Luna is typing...
        </div>
      </div>

      <div class="input-area">
        <input [(ngModel)]="inputMsg" placeholder="Type your message..." (keyup.enter)="send()" />
        <button (click)="send()">Send</button>
      </div>
    </div>
  `,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  styles: [`
    .chat-container {
      max-width: 600px;
      margin: 3rem auto;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 25px rgba(0,0,0,0.12);
      display: flex;
      flex-direction: column;
      font-family: 'Segoe UI', sans-serif;
      background: #f9f9fb;
    }

    .header {
      background: linear-gradient(90deg, #6c63ff, #8a80ff);
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      font-size: 1.3rem;
      font-weight: 600;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .new-chat-btn {
      background: #ff4d4f;
      border: none;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.3s ease;
    }
    .new-chat-btn:hover { background: #d9363e; }

    .chat-box {
      flex: 1;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow-y: auto;
      background: #f0f2f5;
    }

    .message { display: flex; }
    .message.user { justify-content: flex-end; }
    .message.bot { justify-content: flex-start; }

    .bubble {
      padding: 10px 18px;
      max-width: 70%;
      border-radius: 20px;
      line-height: 1.4;
      font-size: 0.95rem;
      box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    }

    .user .bubble {
      background: #0078ff;
      color: white;
      border-bottom-right-radius: 4px;
    }
    .bot .bubble {
      background: #e0e7ff;
      color: #034f84;
      border-bottom-left-radius: 4px;
    }

    .input-area {
      display: flex;
      padding: 0.8rem 1rem;
      gap: 0.8rem;
      border-top: 1px solid #ddd;
      background: #fff;
    }

    input {
      flex: 1;
      padding: 0.65rem 1rem;
      border-radius: 25px;
      border: 1px solid #ccc;
      outline: none;
      font-size: 0.95rem;
      transition: all 0.2s ease-in-out;
    }
    input:focus { border-color: #6c63ff; box-shadow: 0 0 8px rgba(108,99,255,0.3); }

    button {
      padding: 0.6rem 1.2rem;
      border-radius: 25px;
      border: none;
      background: #6c63ff;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s;
    }
    button:hover { background: #574fcf; }

    .typing {
      display: flex;
      align-items: center;
      gap: 3px;
      font-style: italic;
      font-size: 0.85rem;
      color: #666;
    }

    .dot {
      width: 6px;
      height: 6px;
      background: #6c63ff;
      border-radius: 50%;
      animation: blink 1s infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes blink {
      0%, 80%, 100% { opacity: 0; }
      40% { opacity: 1; }
    }

    @media(max-width: 640px) {
      .chat-container { margin: 2rem 1rem; }
      .bubble { max-width: 80%; }
    }
  `]
})
export class ChatPage implements AfterViewChecked {
  messages: { sender: string; text: string }[] = [];
  inputMsg = '';
  isBotTyping = false;
  userId = 'user1';

  @ViewChild('chatBox') private chatBox!: ElementRef;

  constructor(private http: HttpClient) {
    this.loadHistory();
  }

  ngAfterViewChecked() { this.scrollToBottom(); }

  send() {
    if (!this.inputMsg.trim()) return;

    const msg = this.inputMsg;
    this.messages.push({ sender: 'You', text: msg });
    this.inputMsg = '';
    this.isBotTyping = true;

    this.http.post<{ bot: string }>('http://localhost:4000/api/chat/message', {
      userId: this.userId, message: msg
    }).subscribe({
      next: res => {
        this.isBotTyping = false;
        this.messages.push({ sender: 'Luna', text: res.bot });
        this.saveHistory();
      },
      error: () => {
        this.isBotTyping = false;
        this.messages.push({ sender: 'Luna', text: '⚠️ Unable to connect to server.' });
      }
    });
  }

  loadHistory() {
    this.http.get<{ sender: string; message: string }[]>(`http://localhost:4000/api/chat?userId=${this.userId}`)
      .subscribe({
        next: data => {
          this.messages = data.map(m => ({
            sender: m.sender === 'bot' ? 'Luna' : 'You',
            text: m.message
          }));
        },
        error: () => console.error('Failed to load chat history')
      });
  }

  saveHistory() {
    // Optionally, you could POST to backend to update/save
  }

  clearChat() {
    if (!confirm('Are you sure you want to clear the chat?')) return;
    this.messages = [];
    // Optionally, call backend to delete user's messages
  }

  private scrollToBottom() {
    try { this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight; }
    catch (err) {}
  }
}