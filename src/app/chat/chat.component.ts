import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  history: string[];
  prompt: string = '';
  constructor() {
    this.history = [];
    if (localStorage.getItem('chat') == null) {
      this.history.push('Butiksbiträde - Vad kan jag hjälpa dig med?');
      localStorage.setItem('chat', JSON.stringify(this.history));
    } else {
      this.history = JSON.parse(<string>localStorage.getItem('chat'));
    }
  }
  formSubmit() {
    this.history.push('Du - ' + this.prompt);
    localStorage.setItem('chat', JSON.stringify(this.history));
    fetch('http://localhost:8080/chat', {
      method: 'POST',
      body: JSON.stringify({
        prompt: this.prompt,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        this.history.push('Butiksbiträde - ' + data);
        localStorage.setItem('chat', JSON.stringify(this.history));
      });
  }
}
