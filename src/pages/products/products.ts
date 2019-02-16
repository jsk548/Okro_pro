import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductType } from '../../models/ProductType';
import { Product, productData } from '../../models/product';

@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {

  private productsType: ProductType;
  private productsList: Array<Product>;
  constructor(public navCtrl: NavController) {
  }

  ionViewDidEnter() {
    this.productsList = productData;
  }
  
  onChangeProductsType() {
    console.log("category changed", this.productsType);
  }

}
