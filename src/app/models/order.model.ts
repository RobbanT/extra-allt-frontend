import { CartItem } from './cartItem.model';

export interface Order {
  id: string;
  timeCreated: string;
  cartItems: CartItem[];
  totalSum: number;
}
