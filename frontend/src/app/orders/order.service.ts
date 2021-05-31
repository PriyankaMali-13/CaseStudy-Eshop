import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderPlaceUrl = 'http://localhost:7000/add/orders';
  constructor(private http: HttpClient) {}

  //method to place an order
  placeOrder(orderInfo: OrderInfo) {
    return this.http.post(this.orderPlaceUrl,orderInfo);
  }
}



export interface OrderInfo {
  firstName: string;
  lastName: string;
  address: string;
  products: ProductInfo[];
}
export interface ProductInfo {
  productId: string;
  quantity: number;
  price: number;
}
