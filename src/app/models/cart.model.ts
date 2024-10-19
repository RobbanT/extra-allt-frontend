import { CartItem } from './cartItem.model';
import { Product } from './product.model';

export class Cart {
    private cartItems: CartItem[];

    constructor() {
        this.cartItems = [];
        // Har vi några produkter i localStorage när scriptet läses in? Då lägger vi till produkterna i listan.
        if (localStorage.getItem('cart') != null) {
            this.loadCart();
        }
    }

    // Sparar varukorgen till localstorage.
    saveCart(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    // Hämtar varukorgen från localstorage.
    loadCart(): void {
        this.cartItems = JSON.parse(<string>localStorage.getItem('cart'));
    }

    // Tömmer hela varukorgen.
    clearCart(): void {
        this.cartItems = [];
        localStorage.removeItem('cart');
        this.saveCart();
    }

    // Lägger till en produkt till varukorgen.
    addProductToCart(product: Product): void {
    for (let cartItem of this.cartItems) {
        if (cartItem.title === product.title) {
            cartItem.quantity++;
            this.saveCart();
            return;
        }
    }
    this.cartItems.push(new CartItem(product.category, product.title,
        product.image, product.description, product.price, 1));
    this.saveCart();
  }

  // Ändrar antalet av en viss produkt.
  setQuantityForProduct(title: string, quantity: number): void {
      for (let index in this.cartItems) {
          if (this.cartItems[index].title === title) {
              this.cartItems[index].quantity = quantity;
              break;
          }
      }
      this.saveCart();
  }

  // Tar bort alla exemplar av en viss produkt.
  removeProductFromCartAll(title: string): void {
      for (let index in this.cartItems) {
          if (this.cartItems[index].title === title) {
              this.cartItems.splice(<number><unknown>index, 1);
              break;
          }
      }
      this.saveCart();
  }

  // Räknar ut antalet produkter i varukorgen.
  totalProducts(): number {
      let totalProducts: number = 0;
      for (let cartItem of this.cartItems) {
          totalProducts += cartItem.quantity;
      }
      return totalProducts;
  }

  // Räknar ut det totala priset för alla produkter i varukorgen.
  totalPrice(): number {
      let totalPrice: number = 0;
      for (let cartItem of this.cartItems) {
          totalPrice += cartItem.price * cartItem.quantity;
      }
      return totalPrice;
  }

  // Returnerar en kopia av varukorgen med alla produkter.
  getCart(): CartItem[] {
      return [...this.cartItems];
  }
}
