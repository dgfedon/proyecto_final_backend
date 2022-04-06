import { interfaceProduct } from './product';

export interface interfaceCart {
    id: number;
    timestamp: number;
    products: interfaceProduct[];
}