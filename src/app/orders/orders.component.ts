import { Component } from '@angular/core';
import { Order } from '../models/order.model';
import { OrderComponent } from "../order/order.component";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: Array<Order> = [];
  constructor() {
    fetch(`http://localhost:8080/user/${JSON.parse(localStorage.getItem('user') as string).username}/orders`)
      .then((res) => res.json()).then((data) => {
        this.orders = data;
        for (let order of this.orders) {
          order.timeCreated = order.timeCreated.replace('T', ' - ').slice(0, 18);
        }
      })
  }
}
