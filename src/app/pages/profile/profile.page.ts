import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  activeMenu: string;
  user: any = {};
    constructor(private route:Router,public menu: MenuController, public navCtrl: NavController) { 
      menu.close();
    }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));

  }
  editProfile(){
    console.log(this.user.profile);

    this.route.navigate(['edit-profile']);
  }
  goToBack(){
    this.navCtrl.back();
  }
}
