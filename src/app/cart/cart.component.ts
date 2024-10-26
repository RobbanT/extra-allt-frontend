import { Component, input } from '@angular/core';
import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cartItem.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart = input<Cart>();

  openCheckoutDialog(): void {}
}
