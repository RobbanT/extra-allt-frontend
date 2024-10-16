import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  userLoggedIn = input();
  changedUserLoggedIn = output<boolean>();
  changedTitle = output<string>();

  changeTitle(title: string) {
    this.changedTitle.emit(title);
  }

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    this.changedTitle.emit('Produkter');
    this.changedUserLoggedIn.emit(false);
  }
}
