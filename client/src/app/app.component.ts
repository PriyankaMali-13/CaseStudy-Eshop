import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CartService } from './cart/cart.service';
import { UsersService } from './users/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  numberOfItems: number = 0;
  isAdminUrl = false;
  

  constructor(
    public _userService: UsersService,
    private cartService: CartService,
    private router : Router
  ) {

     router.events.subscribe({
       next: (event) => {
         console.log(event);

         if (event instanceof NavigationStart) {
           let url = (<NavigationStart>event).url;
           this.isAdminUrl = url.includes('/admin');
         }
       },
     });
  }

  ngOnInit(): void {
    this.cartService.cartObservable.subscribe({
      next: (cart) => {
        console.log(cart);
        this.numberOfItems = Object.keys(cart).length;
      },
    });
  }
}
