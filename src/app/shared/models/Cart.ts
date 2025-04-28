import { Product } from "./Product";
import { User } from "./User";

export interface Cart {
    id: number;
    user: User;
    products_in_cart: Product[];
}