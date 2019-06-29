import { Component, OnInit } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {NavController, ModalController, AlertController, NavParams, ToastController} from '@ionic/angular';
import {ServerService} from "../../services/server.service";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  user: any = {};
  selectedPath = '';
  errorMessage: string;
  successMessage: string;
  public appPages = [
    {
      title: 'Home',
      url: '/menu/home',
      icon: 'home'
    },
    {
      title: 'My Wallet',
      url: '/menu/wallet',
      icon: 'wallet'
    },
    {
      title: 'History',
      url: '/menu/history',
      icon: 'time'
    },
    { title: 'Notifications', 
      url: '/menu/notifications', 
      icon: 'notifications' },
    {
      title: 'Invite Friends',
      url: '/menu/invite',
      icon: 'gift'
    },
    {
      title: 'Settings',
      url: '/menu/setting',
      icon: 'settings'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    }
  ];
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private db: ServerService
  ) {
    this.router.events.subscribe((event: RouterEvent) =>{
      if(event && event.url){
        this.selectedPath = event.url;
      }
    });
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
  goToBack() {
    this.navCtrl.navigateBack('/startpage');
  }
  driverlogout() {
      this.db.logout().then((res: any) => {
          console.log(res);
          this.errorMessage = "";
          this.successMessage = "Your account logout.";
          this.goToBack();
      });
  }
  checkPage(page) {
    if (page.title === 'Logout') {
      this.driverlogout();
    } else {
      this.router.navigate([page.url]);
    }
  } 
  profile() {
    // this.navCtrl.navigateForward(['/menu/profile']);
    this.router.navigate(['/menu/profile']);
  }
}
