import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public driverDetails = {};
  public driverDocuments: Array<any> = [];
  public otherDetails: Array<any> = [];
  user: any = {};
  constructor(public route: Router) { }

  ngOnInit() {
    this.driverDetails = {
      profileImage: '../../assets/driver.jpeg',
      driverName: 'John Deo',
      memberType: 'Gold Member',
      vehicle: [],
      document: [],
      review: ''
    }
    this.driverDocuments = [
      { icon: 'car', title: 'Vehicle Management', background: '#FF9600', page: 'vehiclemanagement' },
      { icon: 'document', title: 'Document Management', background: '#A1EBAE', page: 'documentmanagement' },
      { icon: 'star', title: ' Review Management', background: '#FFD114', page: 'reviewmanagement' },
      // { image: '../../assets/img/worldwide1.png', title: 'Language', background: '#007BFF' },
    ]

    this.otherDetails = [
      // { icon: 'notifications', title: 'Notifications', background: '#59CAFA', page: '/menu/notifications' },
      { image: '../../assets/img/crown.png', title: 'Terms and Privacy Policy', background: '#908F95', page: 'terms-condictions' },
      { icon: 'help-circle-outline', title: 'Contact Us', background: '#FF2954', page: 'contact-us' },
    ]   
    this.user = JSON.parse(localStorage.getItem("user")); 
  }
  goToProfile() {
    console.log('profile Page');
    this.route.navigate(['/menu/profile']);
  }
  documentPage(page) {
    if (page) {
      this.route.navigate([page]);
      console.log(page);
    }
  }
  otherPage(page) {
    if (page) {
      this.route.navigate([page]);
    }
  }
}
