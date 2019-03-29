import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';


@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  product: Product;
  quantity: number;
  constructor(public dialogRef: MatDialogRef<AddToCartComponent>,
    @Inject(MAT_DIALOG_DATA) public idProduct: string,
    private productService: ProductService
    ) { }

  ngOnInit() {
    
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
      )

    }
    onSubmit({value, valid}: {value: any, valid: boolean}) {
      console.log(this.quantity + " - "  + this.idProduct);

    }
  }

