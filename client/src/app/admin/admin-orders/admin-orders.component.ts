import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/orders';
import { OrderService } from 'src/app/orders/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.collectOrders();
  }
  collectOrders() {
    this.orderService.getUserOrders().subscribe({
      next: (orders) => {
        console.log(orders);
        this.orders = orders;
      },
    });
  }
}
