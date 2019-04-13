import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/Cart';
import { AuthService } from 'src/app/services/auth.service';
import { unescapeIdentifier } from '@angular/compiler';


@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  product: Product;
  quantity: number;
  cart: Cart;
  constructor(public dialogRef: MatDialogRef<AddToCartComponent>,
    @Inject(MAT_DIALOG_DATA) public idProduct: string,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    ) { }

  ngOnInit() {
    this.authService.getAuth()
      .subscribe(
        user => {
          if(user) {
            this.cartService.getCartByUser(user.uid).subscribe(
              cart => {
                this.cart = cart;
              }
            );
          }
        }
      )
    
    this.productService.getProductById(this.idProduct)
      .subscribe(
        product => {
          this.product = product;
          this.productService.getProductImgUrl(product.filename)
            .subscribe(
              url => {
                this.product.url = url;
              }
            )
        }
      );

    
    }
    onSubmit({value, valid}: {value: any, valid: boolean}) {
      let isOnCart: boolean = false;
      // Obtain the current quantity of this product on car
      this.cart.productsOnCart.map(e => {
          if (e.id == this.idProduct) {
            e.quantity = e.quantity + this.quantity;
            isOnCart = true;
          }
        })
      // Add new product to cart
      if (!isOnCart) 
        this.cart.productsOnCart.push({
          'id': this.idProduct, 
          'quantity': this.quantity,
          'name': this.product.name,
          'filename': this.product.filename,
          'price': this.product.price,
        });
      this.cartService.updateCart(this.cart);
      this.dialogRef.close();
    }
  }

