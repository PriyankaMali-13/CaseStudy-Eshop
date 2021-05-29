import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/products';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
 products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.collectProducts();
  }

  collectProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log(this.products);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  /* collectProducts() {
    this.productService.getAllProducts().subscribe({
      next: (result) => {
        //this.products = products;
        console.log(result);
      },
      error: (error) => {
        console.log(error);
      },
    });
  } */
}
