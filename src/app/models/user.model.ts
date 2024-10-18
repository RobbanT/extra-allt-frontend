import { Order } from './order.model';

export interface User {
    username: string;
    password: string;
    orders: Order[];
}
