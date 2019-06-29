import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public notifications = [
    {
      title: 'system',
      subtitle: 'Booking #1234 has been Success...',
      iconUrl: '../../assets/img/success.png',
    },
    {
      title: 'Parmotion',
      subtitle: 'Inivite friend - Get 3 couponse each',
      iconUrl: '../../assets/img/coupon.png',
    },

    {
      title: 'Parmotion',
      subtitle: 'Inivite friend - Get 3 couponse each',
      iconUrl: '../../assets/img/coupon.png',
    },

    {
      title: 'system',
      subtitle: 'Booking #1234 has been Success...',
      iconUrl: '../../assets/img/error.png',
    },

    {
      title: 'system',
      subtitle: 'Booking #1234 has been Success...',
      iconUrl: '../../assets/img/success.png',
    },


  ]
  constructor(
    public alertController: AlertController,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  async notificationAlert(item){
    const alert = await this.alertController.create({
      header: `${item.title}`,
      message: `${item.subtitle}`,
      buttons: ['OK']
    });

    await alert.present();
  }
  goToBack(){
    this.navCtrl.back();
  }
}
