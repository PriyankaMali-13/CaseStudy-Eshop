import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from '../models/orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderPlaceUrl = 'http://localhost:7000/add/orders';
  getUserAllOrders = 'http://localhost:7000/orders';
  constructor(private http: HttpClient) {}

  //method to place an order
  placeOrder(orderInfo: OrderInfo) {
    return this.http.post(this.orderPlaceUrl, orderInfo);
  }

  //method to get all orders
  getUserOrders() {
    return this.http.get<any>(this.getUserAllOrders)
      
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
  name : string;
}
