import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from 'src/app/models/products';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  /*Here we are geeting input from parent component which is store component and bind 
  the data in input('product') in store component*/
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
  /*once the button of add to cart is clicked the product will be added to cart*/
  addToCart() {
    console.log(this.product);
    //calling the method to add product to cart from cart service
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
