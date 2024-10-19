import { Component, input } from '@angular/core';
import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userLoggedIn = input();
  cart = input<Cart>();
}
