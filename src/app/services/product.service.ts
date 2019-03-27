import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/Product'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;
  private products: Observable<Product[]>;
  constructor(private afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>('products');
  }

  getProducts(){
    //this.products = this.productsCollection.valueChanges();
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.products;

  }
}
