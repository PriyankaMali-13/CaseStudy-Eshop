import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //creating empty object for cart
  cart: any = {};
  private _cartObservable: BehaviorSubject<Object>;

  constructor() {
    if (!this.isCartExists())
      localStorage.setItem('cart', JSON.stringify(this.cart));
    this.readCartDataFromLocalStorage();
    this._cartObservable = new BehaviorSubject(this.cart);
  }

  readCartDataFromLocalStorage() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '{}');
  }

  writeCartDataToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  //created observable bcoz we want to access this cart from header
  get cartObservable() {
    return this._cartObservable;
  }

  //To clear cart
  clearCart() {
    localStorage.removeItem('cart');
    this._cartObservable.next({});
  }

  addToCart(product: Product) {
    let quantity = this.cart[product._id];
    if (quantity) {
      this.cart[product._id] = +quantity + 1; //+quantity -> converting string to number
    } else {
      this.cart[product._id] = 1;
    }

    // saving product into cart object
    this._cartObservable.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  //Checking if cart already exist
  isCartExists() {
    if (localStorage.getItem('cart')) {
      return true;
    } else {
      return false;
    }
  }

  //to get quantity of a single product
  getQuantity(product: Product) {
    return this.cart[product._id] ? +this.cart[product._id] : 0;
  }

  setQuantity(product: Product, quantity: number) {
    if (quantity < 1) {
      delete this.cart[product._id];
    } else {
      this.cart[product._id] = quantity;
    }

    this.writeCartDataToLocalStorage();
    this._cartObservable.next(this.cart);
  }
}
