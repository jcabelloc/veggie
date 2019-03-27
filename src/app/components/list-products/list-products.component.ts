import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  public products: Product[];
  constructor(private productService: ProductService) { }

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
}
