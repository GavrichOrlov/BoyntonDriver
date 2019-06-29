import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IondriverServicesService } from '../../services/iondriver-services.service';
import { ServerService } from "../../services/server.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  destination: any;
  carName: any;
  order: any;
  constructor(public serviceProvider: IondriverServicesService, public modalCtrl: ModalController, public route: Router, 
    private db: ServerService ) {
  }
  closeModal() {
    let data = {}
    this.db.getriderLocation(data).then((res: any) => {
    }, err => {
      alert(err);
    });
    this.modalCtrl.dismiss();
  }
  async routeModal() {
    // if (this.serviceProvider.showdestination === '') {
    //   this.modalCtrl.dismiss();
    //   const toast: any = await this.serviceProvider.presentToast('You Must select Destination Location First For Estimate Fare');
    //   await toast.present();
    // } else {
      this.modalCtrl.dismiss();
      this.route.navigate(['requestride']);
    // }
  }
  ngOnInit() {}

}