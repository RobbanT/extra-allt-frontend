import { Component, input } from '@angular/core';
import { Product, Categories } from '../models/product.model';
import { ProductComponent } from '../product/product.component';
import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  cart = input<Cart>();
  userLoggedIn = input<boolean>();
  products: Array<Product> = [];

  constructor() {
    fetch('https://extra-allt-backend-app-becxx.ondigitalocean.app/products')
      .then((res) => res.json())
      .then((data) => {
        this.products = data;
      });
  }
}
