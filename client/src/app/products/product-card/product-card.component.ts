import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from 'src/app/models/products';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product!: Product;
  quantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log(this.product);
    this.cartService.cartObservable.subscribe({
      next: (cart) => {
        this.quantity = this.cartService.getQuantity(this.product);
      },
    });
  }
  addToCart() {
    console.log(this.product);
    this.cartService.addToCart(this.product);
  }

  minusQuantity() {
    this.quantity--;
    this.cartService.setQuantity(this.product, this.quantity);
  }

  plusQuantity() {
    this.quantity++;
    this.cartService.setQuantity(this.product, this.quantity);
  }
}
