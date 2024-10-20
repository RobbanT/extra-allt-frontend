import { Component, Inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

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

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '550px',
      height: '400px',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
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
          alert(`Användaren "${this.username}" är nu registrerad!`);
          this.changeTitle('Produkter');
        })
        .catch(() =>
          alert(`Användaren "${this.username}" existerar redan. Försök igen!`)
        );
    } else {
      this.openDialog();
      alert('Lösenorden stämmer inte överens. Försök igen!');
    }
  }
}

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.html',
  styleUrl: 'dialog.css',
})
export class Dialog {
  constructor(public dialogRef: MatDialogRef<Dialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
