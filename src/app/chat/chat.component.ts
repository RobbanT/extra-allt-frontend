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
      this.history.push('AI - Vad kan jag hjälpa dig med?');
      localStorage.setItem('chat', JSON.stringify(this.history));
    } else {
      this.history = JSON.parse(<string>localStorage.getItem('chat'));
    }
  }
  formSubmit() {
    this.history.push('Du - ' + this.prompt);
    localStorage.setItem('chat', JSON.stringify(this.history));
    let tempPrompt: string = this.prompt;
    this.prompt = '';
    fetch('http://localhost:8080/chat', {
      method: 'POST',
      body: JSON.stringify({
        prompt: tempPrompt,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        this.history.push('AI - ' + data);
        localStorage.setItem('chat', JSON.stringify(this.history));
      });
  }
}
