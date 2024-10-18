import { Categories, Product } from './product.model';

export class CartItem implements Product {
    constructor(public category: Categories, public title: string,
        public image: string, public description: string,
        public price: number, public quantity: number) {}
}
