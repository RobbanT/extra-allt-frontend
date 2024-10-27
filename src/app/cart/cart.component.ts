import { Component, input, output } from '@angular/core';
import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cartItem.model';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart = input<Cart>();
  changedTitle = output<string>();
  openCheckoutDialog(): void {
    this.changedTitle.emit('Kassa');
  }
}
