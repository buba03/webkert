export interface Product {
    id: number;
    name: string;
    type: 'painting' | 'whittling' | 'drawing' | 'misc';
    description: string;
    price: number;
    isInCart: boolean;
    image: string;
}