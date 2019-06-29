import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-documentmanagement',
  templateUrl: './documentmanagement.page.html',
  styleUrls: ['./documentmanagement.page.scss'],
})
export class DocumentmanagementPage implements OnInit {
  public documents = [
    {
      'name': 'Driving License',
      'icon': 'person',
      'url': '/drivinglicense'
    },
    {
      'name': 'Hack License',
      'icon': 'person',
      'url':'/drivinglicense'
    },
    {
      'name': 'Airport License',
      'icon': 'person',
      'url':'/drivinglicense'
    }, 
    {
      'name': 'Port Authority License',
      'icon': 'person',
      'url': '/drivinglicense'
    }]
  constructor(public route:Router, public navCtrl: NavController) { }

  ngOnInit() {
  }
  gotoPage(item: any) {
    this.route.navigate([item])

  }
  goToBack(){
    this.navCtrl.back();
  }
}
