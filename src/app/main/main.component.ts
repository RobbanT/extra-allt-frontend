import { Component, input, output } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { OrdersComponent } from '../orders/orders.component';
import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  title = input();
  changedTitle = output<string>();
  userLoggedIn = input<boolean>();
  changedUserLoggedIn = output<boolean>();
  cart = input<Cart>();

  changeUserLoggedIn(userloggedIn: boolean) {
    this.changedUserLoggedIn.emit(userloggedIn);
  }

  changeTitle(title: string) {
    this.changedTitle.emit(title);
  }
}
