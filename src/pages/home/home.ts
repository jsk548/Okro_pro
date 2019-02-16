import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ProductsPage } from '../products/products';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private alertController: AlertController) {

  }

  continueToNext() {
    this.showAlertWithPrompt("Verify Mobile", "mobileNumber", "Enter OTP").then((data)=>{
      if(data && data["mobileNumber"]) {
        this.navCtrl.push(ProductsPage);
      } else {

      }
    }, error =>{

    });
  }

  public showAlertWithPrompt(title: string, placeHolderName: string, placeHolderHint : string): Promise<any> {
    return new Promise<any>( (resolve, reject) => {
      let alert = this.alertController.create({
        title: title,
        enableBackdropDismiss: true,
        inputs: [
            {
                name: placeHolderName,
                placeholder: placeHolderHint
            }
        ],
        buttons: [
            {
                text: "Verify",
                handler: (data) => {
                   resolve(data);
                }
            }
        ]
    });
    alert.present();
    });
  }
 

}
