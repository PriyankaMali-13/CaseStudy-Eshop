import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/products/product.service';
import { CartService } from '../cart.service';
import { map } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
  modalRef!: BsModalRef;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private modalService: BsModalService
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
          console.log(cart[id]);
          observables.push(
            this.productService.getProductById(id).pipe(
              map((product) => {
                this.total += product.price * cart[id];
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

  //To open checkout form
  openModal(form: any) {
    this.modalRef = this.modalService.show(form, {
      animated: true,
      class: 'modal-lg',
    });
  }

  //checkout
  checkOut(evnt: Event, form: HTMLFormElement) {
    evnt.preventDefault();
    let firstName = (<HTMLInputElement>form.elements.namedItem('firstName')).value
    let lastName = (<HTMLInputElement>form.elements.namedItem('lastName')).value;
    let address = (<HTMLInputElement>form.elements.namedItem('address')).value;
    console.log({
      firstName,
      lastName,
      address
    });
    return false;
    
  }
}
