import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { ServerService } from "../../services/server.service";
@Component({
  selector: 'app-vehiclemanagement',
  templateUrl: './vehiclemanagement.page.html',
  styleUrls: ['./vehiclemanagement.page.scss'],
})
export class VehiclemanagementPage implements OnInit {
  public data = [{
    'name': 'Madza',
    'car_no': '43A 235 70',
    'icon': 'paper',
    // 'image': '../../assets/img/user1.jpeg',
  },
  {
    'name': 'Mitshubishi Outlander',
    'car_no': '43A 125 70',
    'icon': 'paper',
    //  'image': '../../assets/img/user2.jpeg',
  }];
  user: any;
  cars: any = [{}];
  currentcarid: any;
  constructor(
    public modalCtrl: ModalController, 
    public nativePageTransitions: NativePageTransitions, 
    public route: Router,
    public navCtrl: NavController,
    private db: ServerService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.carinfoGetbyID();
  }
  openpageTRansition() {
    // let options: NativeTransitionOptions = {
    //   direction: 'up',
    //   duration: 1000,
    //   slowdownfactor: 5,
    //   slidePixels: 20,
    //   iosdelay: 100,
    //   androiddelay: 250,
    //   fixedPixelsTop: 0,
    //   fixedPixelsBottom: 60
    // };
    // this.nativePageTransitions.slide(options)
    this.route.navigate(['addnewvehicle']);
  }
  customAlertOptions: any = {
    header: 'Pizza Toppings',
    subHeader: 'Select your toppings',
    message: '$1.00 per topping',
    translucent: true
  };
  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };
  goToBack(){
    this.navCtrl.back();
  }
  carinfoGetbyID() {
    const postData = {
      id: this.user.id
    };
    this.db.carinfoGetbyID(postData).then((res: any) => {
      console.log(res.cars);
      console.log(res.cars[0].car_name);
      this.cars = res.cars;
      for(let data of this.cars) {
        if(data.active == 1){
          this.currentcarid = data.id;
          console.log("currentid", this.currentcarid);
        }
      }
    });
  }
  checkFunc(value: any){
    console.log(value);
    if(value != this.currentcarid) {
      const postData = {
        id: value,
        currentcarid: this.currentcarid
      }
      this.db.carActive(postData).then((res:any) =>{
        console.log(res);
        this.currentcarid = value;
      }) 
    }
    
  }
}
