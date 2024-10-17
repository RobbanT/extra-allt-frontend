import { CartItem } from './cartItem.model';

export interface Order {
  id: string;
  createdTime: string;
  cartItems: CartItem[];
}
