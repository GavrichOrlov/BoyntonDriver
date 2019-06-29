import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-terms-condictions',
  templateUrl: './terms-condictions.page.html',
  styleUrls: ['./terms-condictions.page.scss'],
})
export class TermsCondictionsPage implements OnInit {

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  goToBack(){
    this.navCtrl.back();
  }
}
