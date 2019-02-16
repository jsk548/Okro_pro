import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductType } from '../../models/ProductType';

@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {

  private productsType: ProductType;
  constructor(public navCtrl: NavController) {
  }
  
  onChangeProductsType() {
    console.log("category changed", this.productsType);
  }

}
