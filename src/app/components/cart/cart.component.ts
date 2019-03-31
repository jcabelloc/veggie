import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

export interface Transaction {
  item: string;
  price: number;
  quantity?: number;
  total?: number;
  imgUrl?: string;
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

  constructor(private cartService: CartService,
    private productService: ProductService
    ) { }

  ngOnInit() {

    this.cartService.getCartByUser(this.user)
      .subscribe(
        cart => {
          this.transactions = [];
          cart.productsOnCart.forEach(
            e => {
              let line: Transaction = {
                item: e.name, 
                price: e.price,
                quantity: e.quantity,
                total: e.price * e.quantity
              }
              this.productService.getProductImgUrl(e.filename)
                .subscribe(
                  url => {
                    line.imgUrl = url
                  }
                );
              
              this.transactions.push(line);
            }
          )
        }
      )

  }
  getTotalCost() {
    return this.transactions.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }

}
