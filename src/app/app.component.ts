import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { Cart } from './models/cart.model';

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
