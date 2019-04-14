import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { MatSelectChange } from '@angular/material';
import { Order } from 'src/app/models/Order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { O_DIRECT } from 'constants';

export interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  collections: Option[] = [
    {value: 'orders', viewValue: 'Orders'},
    {value: 'users', viewValue: 'Users'},
  ]
  displayedColumns: string[] = ['name', 'price', 'quantity', 'total'];

  orders: Observable<Order[]>;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  onOptionSelection(option: MatSelectChange){
    switch(option.value) {
      case "orders": {
        this.orders = this.orderService.getAllOrders().pipe(
          map(orders => {
            orders.forEach(
              order=> {
                let orderAmount = 0
                order.details.forEach( e => { 
                  e.amount = e.price * e.quantity;
                  orderAmount += e.amount
                })
                order.amount = orderAmount;
              }
            )
            return orders;
          }));
        break;
      }
      case "users": {
        break;
      }
      default: {
        break;
      }

    }
  }

}
