import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/orders';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders : Order[]=[];
  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
    this.collectOrders()
  }

  collectOrders(){
    this.orderService.getUserOrders()
    .subscribe({
      next:(orders)=>{
        console.log(orders);
        this.orders = orders;
        
      }
    })

  }

}
