import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';
import { CartComponent } from '../cart/cart.component';
import { Cart } from '../models/cart.model';

export interface DialogData {
  title: string;
  cart: Cart;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [ChatComponent, CartComponent],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css',
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    console.log(this.data.cart.totalProducts());
    this.dialogRef.close();
  }
}
