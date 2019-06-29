import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit, OnChanges {
  data: any = [];
  public walletPage: any ='cash';
  constructor() { 
    this.data = [{
      'name': 'Elva Barnet',
      'amount': '$22.50',
      'image': '../../assets/img/dollar.png'
    }, {
      'name': 'Elva Barnet',
      'amount': '$22.50',
      'image': '../../assets/img/dollar.png'
    }, {
      'name': 'Elva Barnet',
      'amount': '$22.50',
      'image': '../../assets/img/dollar.png'
    }, {
      'name': 'Elva Barnet',
      'amount': '$22.50',
      'image': '../../assets/img/dollar.png'
    }, {
      'name': 'Elva Barnet',
      'amount': '$22.50',
      'image': '../../assets/img/dollar.png'
    }, {
      'name': 'Elva Barnet',
      'amount': '$22.50',
      'image': '../../assets/img/dollar.png'
    }]
  }
  segmentChanged(ev: any) {
    console.log('sgennkjkhkjkjk');
    console.log('Segment changed button clicked', ev);
   }
  ngOnInit() {
  }
  ngOnChanges() {
    console.log('change')
  }
}
