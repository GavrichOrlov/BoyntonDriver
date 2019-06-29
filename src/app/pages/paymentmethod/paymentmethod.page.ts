import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-paymentmethod',
  templateUrl: './paymentmethod.page.html',
  styleUrls: ['./paymentmethod.page.scss'],
})
export class PaymentmethodPage implements OnInit {
  data: { 'type': string; 'amount': string; 'image': string; }[];
  constructor(
    public navCtrl: NavController
  ) {
    this.data = [{
      'type': 'VISA',
      'amount': '************3765',
      'image': '../../assets/img/visa.png'
    }, {
      'type': 'Paypal',
      'amount': '************3765',
        'image': '../../assets/img/paypal.png'
    }, {
      'type': 'Master Card',
      'amount': '************3765',
        'image': '../../assets/img/mastercard.png'
    }, {
      'type': 'Paytm',
      'amount': '************3765',
      'image': '../../assets/img/dollar.png'
      }, {
        'type': 'Cash',
        'amount': '************3765',
        'image': '../../assets/img/paypal.png'
      }]
   }

  ngOnInit() {
  }
  goToBack(){
    this.navCtrl.back();
  }
}
