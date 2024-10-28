import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { Cart } from './models/cart.model';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
  
export class AppComponent {
  title = signal('Produkter');
  userLoggedIn = signal(localStorage.getItem('user') != null);
  cart = signal(new Cart());
  stompClient = signal(
    Stomp.over(new SockJS('http://localhost:8080/websocket'))
  );

  constructor(private _snackBar: MatSnackBar) {
    this.stompClient().connect({}, (frame) => {
      this.stompClient().subscribe('/order/placed', (username) => {
        this._snackBar.open(
          `Användaren \"${JSON.parse(username.body).username}\" har precis lagt en order! 💰🎉🎉`,
          '',
          { duration: 5000 }
        );
      });
    });
    /*
        this.stompClient()?.send(
      '/app/placed',
      {},
      JSON.stringify({
        username: `${
          JSON.parse(localStorage.getItem('user') as string).username
        }`,
      })
    );*/
  }

  getTitle() {
    return this.title();
  }

  setTitle(title: string) {
    this.title.set(title);
  }

  getUserLoggedIn() {
    return this.userLoggedIn();
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.set(userLoggedIn);
  }

  getCart() {
    return this.cart();
  }

  setCart(cart: Cart) {
    this.cart.set(cart);
  }
}
