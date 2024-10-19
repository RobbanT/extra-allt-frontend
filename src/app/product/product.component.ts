import { Component, input } from '@angular/core';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  product = input<Product>();
  cart = input<Cart>();
  userLoggedIn = input<boolean>();
  addToCart(product: Product | undefined): void {
    this.cart()?.addProductToCart(<Product>product);
  }
}
