import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  changedTitle = output<string>();
  username: string = '';
  password: string = '';
  passwordConfirm: string = '';
  dialogTitle: string = '';
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '900px',
      autoFocus: true,
      data: this.dialogTitle,
    });
  }
  changeTitle(title: string) {
    this.changedTitle.emit(title);
  }

  formSubmit() {
    if (this.password == this.passwordConfirm) {
      fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          this.dialogTitle = `Användaren "${this.username}" är nu registrerad!`;
          this.openDialog();
          this.changeTitle('Produkter');
        })
        .catch(() => {
          this.dialogTitle = `Användaren "${this.username}" existerar redan. Försök igen!`;
          this.openDialog();
        });
    } else {
      this.dialogTitle = 'Lösenorden stämmer inte överens. Försök igen!';
      this.openDialog();
    }
  }
}
