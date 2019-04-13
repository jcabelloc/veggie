import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cart } from '../models/Cart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private afs: AngularFirestore) { }

  // deprecated
  /*
  addProduct(user: string, idProduct: string, quantity: number) {

    // Retrieve user cart
    this.getCartByUser(user).subscribe(
      e => {
        let isOnCart: boolean = false;
        // Obtain the current quantity of this product on car
        e.productsOnCart.map(e => {
          if (e.id == idProduct) {
            e.quantity = e.quantity + quantity;
            isOnCart = true;
          }
        })
        // Add new product to cart
        if (!isOnCart) 
          e.productsOnCart.push({'id': idProduct, 'quantity': quantity});
        
        // Update the user cart
        this.updateCart(e)

      }
      
    )
   }
  */

  updateCart(cart: Cart){
    return this.afs.doc<Cart>('carts/'+cart.uid).update(cart);
  }

  setCart(cart: Cart){
    return this.afs.doc<Cart>('carts/'+cart.uid).set(cart);
  }

  createCart(uid: string){
    let cart: Cart = {uid: uid, productsOnCart: []}
    return this.afs.doc<Cart>('carts/'+uid).set(cart);
  }


  getCartByUser(uid: string) {
    return this.afs.collection('carts').doc<Cart>(uid)
      .valueChanges().pipe(
        map(e=> {
          //e.uid = uid;
          return e;
        })
      );
  }
}
