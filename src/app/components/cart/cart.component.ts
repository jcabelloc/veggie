import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user: string = 'admin';
  constructor(private cartService: CartService) { }

  ngOnInit() {

    this.cartService.getCartByUser(this.user)
      .subscribe(
        cart => {
          console.log(cart);
        }
      )

  }

}
