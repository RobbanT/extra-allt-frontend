import { Component, input } from '@angular/core';
import { Cart } from '../models/cart.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
  dialogTitle: string = '';
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '900px',
      autoFocus: true,
      data: this.dialogTitle,
    });
  }

  openChat(): void {
    this.dialogTitle = 'Chat';
    this.openDialog();
  }
}
