import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MenuController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  public contactUS = [
    {
      title: 'http://letsride.work/',
      imageUrl: '../../assets/img/enappd-logo-BLUE.png',
      titleUrl: 'http://letsride.work/',
      color: '#000'
    },
    {
      title: 'admin@enappd.com',
      iconUrl: 'mail',
      color: '#dd4b39'
     
    },
    {
      title: '+91-820 931 3520',
      iconUrl: 'call',
      color: '#000'    
    },
    {
      title: '/EnappdStore',
      iconUrl: 'logo-facebook',
      titleUrl:'https://m.facebook.com/EnappdStore/',
      color:'#3C5A99'
    },
    {
      title: '/Enappd',
      iconUrl: 'logo-instagram',
      titleUrl:'https://www.instagram.com/Enappd/',
      color:'#e4405f'
    },
  ]
  constructor(private iab: InAppBrowser, public navCtrl: NavController) { }

  ngOnInit() {
  }
  openUrl(url) {
    const browser = this.iab.create(url);
    window.open(url);
  }
  goToBack(){
    this.navCtrl.back();
  }
}
