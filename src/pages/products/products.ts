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

  applyChanges() {
    this.navCtrl.pop();
  }

  add(product: Product) {
    let itemIndex = this.productsList.findIndex((item)=> item.id === product.id);
    if(this.productsList && this.productsList[itemIndex].quantity >= 0 && this.productsList[itemIndex].quantity < 20 ) {
      this.productsList[itemIndex].quantity += 1;
      console.log("from add");
    }
  }

  remove(product: Product) {
    let itemIndex = this.productsList.findIndex((item)=> item.id === product.id);
    if(this.productsList && this.productsList[itemIndex].quantity > 0) {
      this.productsList[itemIndex].quantity -= 1;
      console.log("from remove");
    }
  }

}
