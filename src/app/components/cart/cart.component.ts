import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

export interface Transaction {
  item: string;
  price: number;
  quantity?: number;
  total?: number;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user: string = 'admin';

  displayedColumns: string[] = ['item', 'price', 'quantity', 'total'];
  transactions: Transaction[];

  constructor(private cartService: CartService) { }

  ngOnInit() {

    this.cartService.getCartByUser(this.user)
      .subscribe(
        cart => {
          this.transactions = [];
          cart.productsOnCart.forEach(
            e => {
              this.transactions.push({
                item: e.name, 
                price: e.price,
                quantity: e.quantity,
                total: e.price * e.quantity
              })
            }
          )
        }
      )

  }
  getTotalCost() {
    return this.transactions.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }

}
