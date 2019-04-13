import { Product } from './Product';

export interface OrderDetail extends Product{
    quantity: number;
}

export interface Order{
    id?: string;
    uid: string;
    details: OrderDetail[];
    status: string;
}