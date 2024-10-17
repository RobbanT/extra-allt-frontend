export enum Categories { ELECTRONICS, FOOD, TOYS, FURNITURE, CLOTHES, }
export interface Product {
    category: Categories;
    title: string;
    image: string;
    description: string;
    price: number;
}
