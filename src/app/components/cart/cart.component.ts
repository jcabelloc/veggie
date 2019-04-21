import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Cart } from 'src/app/models/Cart';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import {MatSnackBar} from '@angular/material';


export interface Transaction {
  productName: string;
  price: number;
  quantity?: number;
  total?: number;
  imgUrl?: string;
  idProduct?: string;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'price', 'quantity', 'total', 'delete'];
  transactions: Transaction[];
  cart: Cart;

  constructor(private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    private orderService: OrderService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    
    this.authService.getAuth().subscribe(user => {
      if (user) {
        this.cartService.getCartByUser(user.uid)
        .subscribe(
          cart => {
            this.cart = cart;
            this.transactions = [];
            cart.productsOnCart.forEach(
              e => {
                let line: Transaction = {
                  productName: e.name, 
                  price: e.price,
                  quantity: e.quantity,
                  total: e.price * e.quantity,
                  idProduct: e.id,
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
    })



  }
  getTotalCost() {
    return this.transactions.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }

  delete(idProduct: string){
    this.cart.productsOnCart = this.cart.productsOnCart.filter(e =>  e.id != idProduct  );
    this.cartService.updateCart(this.cart);
  }

  checkout(){
    this.orderService.placeOrder(this.cart);
    this.snackBar.open('Order placed', 'Thank you!', {
      duration: 3000,
    });
  }
}
