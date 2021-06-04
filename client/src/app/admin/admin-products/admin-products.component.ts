import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products:any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    
  }

  getProducts(){
    this.productService.getAllProducts().subscribe((result)=>{
      console.log(result);
      this.products = result;
      
    })
  }

}
