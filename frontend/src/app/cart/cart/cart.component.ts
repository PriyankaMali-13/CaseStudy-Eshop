import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/products/product.service';
import { CartService } from '../cart.service';
import { map } from 'rxjs/operators';

interface Cartitem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  allCartProducts: any;
  cart: any = {};
  cartItems: Cartitem[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.suscribeCart();
  }

  suscribeCart() {
    this.cartService.cartObservable.subscribe({
      next: (cart: any) => {
        this.cartItems = [];
        let observables = [];
        for (let id in cart) {
          console.log(id);
          observables.push(
            this.productService.getProductById(id).pipe(
              map((product) => {
                this.total += (product.price + cart[id]);
                let item: Cartitem = {
                  product: product,
                  quantity: cart[id],
                };
                return item;
              })
            )
          );
        }
        forkJoin(observables).subscribe({
          next: (cartItems: Cartitem[]) => {
            this.cartItems = cartItems;
          },
        });
      },
    });
  }
}
