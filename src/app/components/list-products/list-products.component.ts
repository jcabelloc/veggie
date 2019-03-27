import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

import { MatDialog } from '@angular/material';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  public products: Product[];
  constructor(private productService: ProductService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.products.forEach(
          e => {
            this.productService.getProductImgUrl(e.filename)
              .subscribe(url=> {
                e.url = url;
              })
          }
        )
      }
    )
  }

  openDialog(idProduct: string): void {
    const dialogRef = this.dialog.open(AddToCartComponent, {
      width: '250px',
      //data: {idProduct: this.idProduct}
      data: idProduct
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}
