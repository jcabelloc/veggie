import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cart } from '../models/Cart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private afs: AngularFirestore) { }


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
