import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/products/product.service';
import { CartService } from '../cart.service';
import { map } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderInfo, OrderService, ProductInfo } from 'src/app/orders/order.service';
import { Router } from '@angular/router';

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
    private modalService: BsModalService,
    private orderService : OrderService,
    private router : Router
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
          //console.log(id);
          //console.log(cart[id]);
          observables.push(
            this.productService.getProductById(id).pipe(
              //earlier I was getting array of products but i wanted the products inside cart with quantity 
              //so to change the type of result u want use map operator
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
        //it will join all the observables at last(insted of taking products one by one)
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
    let firstName = (<HTMLInputElement>form.elements.namedItem('firstName')).value;
    let lastName = (<HTMLInputElement>form.elements.namedItem('lastName')).value;
    let address = (<HTMLInputElement>form.elements.namedItem('address')).value;

    //creating variable of type OrderInfo (Interface in order service)
    let orderInfo: OrderInfo;

    //craeting array of productInfos of type ProductInfo (Interface in product service)
    //ProductInfo[] will basically contain price, id and quantity which we will get from cartitems
    let productInfos : ProductInfo[] = [];

    //Getting product from cartitems
    this.cartItems.forEach(e=>{
      productInfos.push({
        price : e.product.price,
        productId: e.product._id,
        name : e.product.name,
        quantity: e.quantity
      })
    })
    //send this data to server
    orderInfo = {
      address,
      firstName,
      lastName,
      products : productInfos

    }
    console.log({
      orderInfo
    });

    this.orderService.placeOrder(orderInfo).subscribe({
      next: (result) => {
        this.modalRef.hide();
        this.cartService.clearCart();
        this.router.navigate(['/orders']);
        alert('Your order has been successfully placed');
      },
      error: (err) => {
        console.log({ err: 'Can not place order' });
        alert('Can not place order');
      },
    });

    return false;
    
  }
}
