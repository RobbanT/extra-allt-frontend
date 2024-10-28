import { Component, input, output } from '@angular/core';
import { Cart } from '../models/cart.model';
import { loadStripe } from '@stripe/stripe-js';
import Stomp from 'stompjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cart = input<Cart>();
  changedTitle = output<string>();
  checkout: any;
  stompClient = input<Stomp.Client>();

  ngOnInit() {
    this.initializeCheckoutSession();
  }

  ngOnDestroy() {
    this!.checkout.destroy('#checkout-div');
  }

  async initializeCheckoutSession() {
    let stripe = await loadStripe(
      'pk_test_51OmWP0DYlwtrgVcMwJHIMlNRU3WSPoDMSVpVmoxwO4XIHwIkR6UjU7qpc5GrIQULzPPrrNRA6PUtkUcvB8npFW3400LGqj3zkD'
    );
    const response = await fetch(
      `https://extra-allt-backend-app-becxx.ondigitalocean.app/create-checkout-session/${
        JSON.parse(localStorage.getItem('user') as string).username
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: localStorage.getItem('cart'),
      }
    );

    const { clientSecret } = await response.json();
    this.checkout = await stripe!.initEmbeddedCheckout({
      clientSecret,
      onComplete: () => {
        this.stompClient()?.send(
          '/app/placed',
          {},
          JSON.stringify({
            username: `${
              JSON.parse(localStorage.getItem('user') as string).username
            }`,
          })
        );
        fetch(
          `https://extra-allt-backend-app-becxx.ondigitalocean.app/user/${
            JSON.parse(localStorage.getItem('user') as string).username
          }/order`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: localStorage.getItem('cart'),
          }
        )
          .then((res) => res.json())
          .then((data) => {});
        this.cart()?.clearCart();
      },
    });
    this!.checkout.mount('#checkout-div');
  }
}
