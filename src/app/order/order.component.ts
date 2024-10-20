import { Component, input } from '@angular/core';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  order = input<Order>();
}
