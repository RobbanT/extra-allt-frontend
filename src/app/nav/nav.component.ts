import { Component, input, output } from '@angular/core';
import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  userLoggedIn = input();
  changedUserLoggedIn = output<boolean>();
  changedTitle = output<string>();
  cart = input<Cart>();

  changeTitle(title: string) {
    this.changedTitle.emit(title);
  }

  logOut() {
    localStorage.removeItem('user');
    this.cart()?.clearCart();
    this.changedTitle.emit('Produkter');
    this.changedUserLoggedIn.emit(false);
  }
}
