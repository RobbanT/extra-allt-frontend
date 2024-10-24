import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [ChatComponent],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css',
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
