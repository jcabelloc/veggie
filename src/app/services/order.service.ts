import { Injectable } from '@angular/core';
import { Cart } from '../models/Cart';
import { CartService } from './cart.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private cartService: CartService, private afs: AngularFirestore) { }


  placeOrder(cart: Cart){
    // Create an order
    // return this.afs.doc<Cart>('carts/'+uid).set(cart);
    //this.afs.doc<Order>('orders/'+)
    let order = {
      uid: cart.uid,
      status: 'placed',
      details: cart.productsOnCart
    }
    this.afs.collection<Order>('orders').add(order).then(
      docRef => {
        //Create a new Empty Cart
        console.log(docRef)
        this.cartService.createCart(cart.uid);

      }
    );

  }

}
