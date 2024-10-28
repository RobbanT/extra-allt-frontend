import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';
import { CartComponent } from '../cart/cart.component';
import { Cart } from '../models/cart.model';
import { CheckoutComponent } from '../checkout/checkout.component';
import { loadStripe } from '@stripe/stripe-js';
import Stomp from 'stompjs';

export interface DialogData {
  title: string;
  cart: Cart;
  stompClient: Stomp.Client;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [ChatComponent, CartComponent, CheckoutComponent],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css',
})
export class ConfirmationDialogComponent {
  title = signal('');
  checkout: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  setTitle(title: string) {
    this.title.set(title);
    this.data.title = title;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
