import { Product } from "./products";

export interface Order {
  quantity: number;
  paymentMethod: string;
  _id: string;
  product: Product;
  price: number;
  firstName: string;
  lastName: string;
  address: string;
  __v: number;
}
