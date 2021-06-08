import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //creating empty object for cart to add items in cart
  cart: any = {};
  private _cartObservable: BehaviorSubject<Object>;

  constructor() {
    /*setting local storage and assigning an empty cart object 
    refrence to local storage and converting it into string using json.stringify*/
    if (!this.isCartExists())
      localStorage.setItem('cart', JSON.stringify(this.cart));
    this.readCartDataFromLocalStorage();
    this._cartObservable = new BehaviorSubject(this.cart);
  }

  readCartDataFromLocalStorage() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '{}');
  }
 //save cart to local storage
  writeCartDataToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  //created an observable bcoz we want to access this cart from header
  get cartObservable() {
    return this._cartObservable;
  }

  //To clear cart object from local storage 
  clearCart() {
    localStorage.removeItem('cart');
    this._cartObservable.next({});
  }

  /*adding product to cart(managed in local storage) */
  addToCart(product: Product) {
    /*adding the quantity of product it will 1st check the product exist if yes then increase the quantity by +1
    and add the product to cart else add product to cart and assign quantity to 1*/
    let quantity = this.cart[product._id];
    if (quantity) {
      this.cart[product._id] = +quantity + 1; //+quantity -> converting string to number
    } else {
      this.cart[product._id] = 1;
    }

    // saving product into cart object of local storage
    //whenever i say next the components which has subscrie to that data will get update msg
    this._cartObservable.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  //Checking if cart object already exist in local storage if yes it will retutn true esle false
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


  //setting quatity for product 
  setQuantity(product: Product, quantity: number) {
    //when the quantity is 0 remove product from cart
    if (quantity < 1) {
      delete this.cart[product._id];
    } else {
      this.cart[product._id] = quantity;
    }

    this.writeCartDataToLocalStorage();
    this._cartObservable.next(this.cart);
  }
}
