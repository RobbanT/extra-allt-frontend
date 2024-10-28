import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  changedUserLoggedIn = output<boolean>();
  changedTitle = output<string>();
  username: string = '';
  password: string = '';
  dialogTitle: string = '';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '900px',
      autoFocus: true,
      data: { title: this.dialogTitle },
    });
  }
  changeUserIsLoggedIn(userLoggedIn: boolean) {
    this.changedUserLoggedIn.emit(userLoggedIn);
  }

  changeTitle(title: string) {
    this.changedTitle.emit(title);
  }

  formSubmit() {
    fetch(
      `https://extra-allt-backend-app-becxx.ondigitalocean.app/user/${this.username}/${this.password}`
    )
      .then((res) => res.json())
      .then((data) => {
        (data as User).password = '';
        (data as User).orders = [];
        localStorage.setItem('user', JSON.stringify(data));
        this.dialogTitle = `Användaren "${this.username}" är nu inloggad!`;
        this.openDialog();
        this.changeUserIsLoggedIn(true);
        this.changeTitle('Produkter');
      })
      .catch(() => {
        this.dialogTitle = `Användaren "${this.username}" med lösenordet "${this.password}" existerar inte. Försök igen!`;
        this.openDialog();
      });
  }
}
