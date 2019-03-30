import { Product } from './Product';

export interface ProductOnCart extends Product{
    quantity: number;
}

export interface Cart {
    user: string;
    productsOnCart: ProductOnCart[];
}