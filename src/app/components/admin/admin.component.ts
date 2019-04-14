import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { MatSelectChange } from '@angular/material';
import { Order } from 'src/app/models/Order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

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
  strOption: string = "";

  orders: Observable<Order[]>;
  users: Observable<User[]>;
  constructor(private orderService: OrderService, private userService: UserService) { }

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
        this.users = this.userService.getAllUsers();
        break;
      }
      default: {
        break;
      }

    }
  }

}
