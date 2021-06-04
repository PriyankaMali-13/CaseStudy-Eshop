import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAllProductUrl = 'http://localhost:4000/products';
  constructor(private http: HttpClient) {}

  /* getAllProducts() {
    return this.http.get<any>(this.getAllProductUrl)
    .pipe(
      map((result: {products: Product[]})=>{
        return result.products
      })
    )
  } */
  getAllProducts() {
    return this.http.get<any>(this.getAllProductUrl);
  }

  getProductById(id : string) {
    return this.http.get<any>(`${this.getAllProductUrl}/${id}`);
  }
}
