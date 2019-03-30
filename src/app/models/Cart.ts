export interface ProductOnCart {
    idProduct: string;
    quantity: number;
}

export interface Cart {
    user: string;
    productsOnCart: ProductOnCart[];
}