import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { AwsOTPUtils } from '../../providers/aws-otp-utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private firstName: string;
  private lastName: string;
  private mobileNumber: string;
  constructor(public navCtrl: NavController, private alertController: AlertController, private awsUtils: AwsOTPUtils) {

  }

  confirmButtonListener() {
    let confirmButton = document.getElementById('confirm-button');
    Observable.fromEvent(confirmButton,  "click").throttleTime(60000).subscribe(()=>{
      if (this.lastName && this.firstName && this.mobileNumber && this.mobileNumber.length >= 10) {
        if (!this.mobileNumber.startsWith("+91")) {
          let phone = this.mobileNumber;
          this.mobileNumber = "+91" + phone;
        }
        this.awsUtils.createSubscription(this.mobileNumber).then(() => {
          this.awsUtils.publishSubscription().then((otp) => {
            this.showAlertWithPrompt("Verify Mobile", "otp", "Enter OTP").then((data) => {
              if (data && data["otp"]) {
                this.awsUtils.deleteSubscription();
                if (data["otp"] == otp) {
                  this.navCtrl.push(ProductsPage);
                }
              }
            }, error => {
              this.awsUtils.deleteSubscription();
            });
          });
        });
      }
    });
  }

  ionViewDidEnter() {
    this.awsUtils.initAWSWithCrdedentials().then(() => {
      this.awsUtils.getTopics().then((data) => {
        console.log("reached data", data);
        this.confirmButtonListener();
      }, err => {
        console.log("error", err);
      });
    })
  }

  public showAlertWithPrompt(title: string, placeHolderName: string, placeHolderHint: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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

  ionViewDidLeave() {
    this.lastName = null;
    this.firstName = null;
    this.mobileNumber = null;
  }

}
