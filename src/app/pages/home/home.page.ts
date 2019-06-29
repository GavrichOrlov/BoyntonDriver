import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController, LoadingController, AlertController, ModalController,
  MenuController, } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MouseEvent, MapsAPILoader } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { IondriverServicesService } from '../../services/iondriver-services.service';
import { ServerService } from "../../services/server.service";
import {hostApi} from "../../global";
import { forEach } from '@angular/router/src/utils/collection';
import { NotificationComponent } from '../notification/notification.component';
import { async } from 'rxjs/internal/scheduler/async';

declare var google;

const PUSHER_API_KEY = '68eefd5f3327f36ea517';
const PUSHER_CLUSTER = 'mt1';

const OPTIONS_HEADER = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
    "Accept": "application/json",
    "Content-Type": "application/json"
  })
};
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  public markerUrl = '../../assets/markerPin.png';
  public driveStatus: boolean = false;
  public userId: any;
  public userData: any; // user data
  public locationOrigin: any; // driver location on ngOnInit
  public customerId: any; // customer id here
  public userCard: boolean = false;
  public discountFlag: boolean = false;
  public waypoints: any = []
  public show = true;
  public lat: number = 26.5318;
  public lng: number = -80.0905;
  public address: Object;
  public distance: any;
  public amount: any;
  public formatted_address: string;
  public origin: { lat: number, lng: number };
  public destination: { lat: number, lng: number };
  public screenOptions;
  public renderOpts = {
    suppressMarkers: true
  };
  public directionOptions = {
    origin: {
      icon: '../../assets/Google-Car.png'
    },
    destination: {
      icon: '../../assets/distinationsMaker.png',
      opacity: 0.8
    }
  };
  public options = {
    suppressMarkers: true,
  };
  public markerOptions = {
    origin: {
      animation: '\'DROP\'',
      label: 'origin',

    },
    destination: {
      animation: '\'DROP\'',
      label: 'destination',

    },
  }
   renderOptions = {
    suppressMarkers: true,
  }
  
  zoom: number = 12;
  user: any = {};
  data : any;
  lineCoordinates = [];
  comments = [];
  message: string;
  rating = {
    good: 0,
    bad: 0
  };
  starsCount: number;
  searchItem = '';
  autocompleteItems = [];
  map: any;
  showpickup = '';
  markers = [];
  street: any;
  building: any;
  arrived: boolean;
  pickup: boolean;
  pickup_flage: boolean;
  loader: any;
  block: any;
  color = ['black', 'black', 'black'];
  dir: { origin: { lat: number; lng: number; }; destination: { lat: number; lng: number; }; };
  marker: boolean;
  customermarker: boolean;
  customerlocation: any;
  customerlocation_icon: any;
  locations = [];
  drivers = [];
  rider_profile: any;
  car_icon: any;

  constructor(
    private __zone: NgZone,
    public geolocation: Geolocation,
    private menuCtrl: MenuController,
    public serviceProvider: IondriverServicesService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public http : HttpClient,
    public route: Router,
    private db: ServerService) {      
      this.driveStatus = serviceProvider.driverStatus;
      this.userCard = serviceProvider.userCard;
      this.menuCtrl.enable(true);
      this.marker = true;
      this.arrived = false;
      this.pickup = false;
      this.pickup_flage = false;
      this.getCurrentLoaction();
      this.show = true;
  }

  async getCurrentLoaction() {
    const loader = await this.serviceProvider.loading('Getting your location..');
    loader.present()
    this.geolocation.getCurrentPosition().then((resp) => {
      const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      // const mapOptions = {
      //   center: latLng,
      //   zoom: this.zoom,
      //   mapTypeId: google.maps.MapTypeId.ROADMAP,
      //   defaultView: true
      // }
      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude
      this.serviceProvider.directionlat = this.lat
      this.serviceProvider.directionlng = this.lng
      // this.map = new google.maps.Map(mapOptions);
      this.getGeoLocation(resp.coords.latitude, resp.coords.longitude);
      this.lineCoordinates.push(new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude));
      loader.dismiss();
    }).catch((error) => {
      this.initsetTime();
      // console.log('Error getting location', error);
    }).finally(() => {
      
    })

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {

    });
  }

  async getGeoLocation(lat: number, lng: number) {
    if (navigator.geolocation) {
      const geocoder = await new google.maps.Geocoder();
      const latlng = await new google.maps.LatLng(lat, lng);
      // console.log(latlng);
      const request = { latLng: latlng };

      await geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          const rsltAdrComponent = result.address_components;
          if (result !== null) {
            if (rsltAdrComponent[0] !== null) {
              this.block = rsltAdrComponent[0].long_name;
              this.street = rsltAdrComponent[2].short_name;
              this.building = rsltAdrComponent[1].short_name;
            }
            if (this.serviceProvider.flag === true && this.serviceProvider.pickup !== 'India') {
              this.serviceProvider.showpickup = this.block + ' ' + this.street + ' ' + this.building;
            } else if (this.serviceProvider.pickup !== 'India') {
              this.serviceProvider.showdestination = this.street + this.building;
            }
          } else {
            alert('No address available!');
          }
        }
      });
    }
  }

  clickedMarker(label: string, index: number) {
    // console.log(`clicked the marker: ${label || index}`)
  }
  markerDragEnd(m: marker, $event: MouseEvent) {
    // console.log('dragEnd', m, $event);
  }
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.initsetTime();
    this.car_icon = { url: '../../../assets/img/cab.png', scaledSize: { width: 30, height: 30 } };
    console.log(this.marker);
  }
  initsetTime(){
    setTimeout(()=>{
      if(this.pickup_flage === false)
        this.getLocataionData();
      else if(this.pickup_flage === true)
        this.getOrderData();
    }, 5000);
  }
  getOrderData(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude
    });
    let data = {
      lat: this.lat,
      lng: this.lng,
      user_id: this.user.id,
      rider_id: this.serviceProvider.order.rider_id,
      order_id: this.serviceProvider.order.id,
      user_kind: 1
    }
    this.db.getOrderLocation(data).then((res: any) => {
      this.customerlocation  = res.data;
      this.customerlocation_icon  = { url: "../../../assets/rider.png", scaledSize: { width: 30, height: 30 } };
      if(res.notification === "request" && this.driveStatus){
        this.showNotifictionOnOrder(res.notification_data);
      } else if(res.notification === "canceled" && this.driveStatus){
        this.showCanceledOnOrder(res.canceled);
      }else if(res.notification === "completed" && this.driveStatus){
        this.showCompletedOnOrder(res.completed);
      } else{
        this.pickup = true;
        this.initsetTime();
      }
    }, err => {
      // alert(err);
    });
  }

  getLocataionData() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude
    });
    let data = {
      lat: this.lat,
      lng: this.lng,
      user_id: this.user.id,
      user_kind: 1
    }
    this.db.getriderLocation(data).then((res: any) => {
      this.locations  = res.data;
      this.drivers = res.data;
      // for(let i = 0; i < res.data.length; i++){
      //   this.locations[i].icon  = { url: hostApi+res.data[i].icon, scaledSize: { width: 30, height: 30 } };
      // }
      if(res.notification === "request" && this.driveStatus){
        this.serviceProvider.order = res.notification_data;
        this.showNotifiction(res.notification_data);
      } else{
        this.initsetTime();
      }
    }, err => {
      // alert(err);
    });
  }

  async showNotifiction(order_data){
    const alert = await this.alertCtrl.create({
      header: 'Request from ' + order_data.firstname +' '+ order_data.lastname,
      message:
        'Do you want to accept this request?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            let data = { id: order_data.id, status: 1 };
            this.db.acceptRequest(data).then((res: any) => {
              this.serviceProvider.order = res.data;
              this.origin = { lat: parseFloat(res.data.origin_lat), lng: parseFloat(res.data.origin_lng) };
              this.destination = { lat: parseFloat(res.data.destination_lat), lng: parseFloat(res.data.destination_lng) };
              this.serviceProvider.originlocation = this.origin;
              this.serviceProvider.destinationlocation = this.destination;
              this.userData = res.data;
              this.amount = res.data.amount;
              this.distance = res.data.distance;
              this.rider_profile = hostApi + 'public/' + res.data.profile;
              this.userCard = true;
              this.pickup_flage = true;
              // document.getElementById('distance').innerHTML = this.distance.toFixed(1) + ' miles';
              // document.getElementById('amount').innerHTML = '$ ' + this.amount.toFixed(1);
              
            });
            this.initsetTime();
            this.route.navigate(['menu/home']);
          }
        },
        // {
        //   text: 'Ignore',
        //   handler: () => {
        //     let data = { id: order_data.id, status: 3 };
        //     this.db.acceptRequest(data).then((res: any) => {
        //       console.log(res);
        //     });
        //     this.initsetTime();
        //     this.route.navigate(['menu/home']);
        //   }
        // },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            let data = { id: order_data.id, status: 2 };
            this.db.acceptRequest(data).then((res: any) => {
              // console.log(res);
            });
            this.initsetTime();
            this.route.navigate(['menu/home']);
          }
        }
      ]
    });
    return await alert.present();
    // const profileModal: any = await this.serviceProvider.cabModal(NotificationComponent,'backTransparent');
    // profileModal.present();
  }
  async showNotifictionOnOrder(order_data){
    const alert = await this.alertCtrl.create({
      header: 'Request from ' + order_data.firstname +' '+ order_data.lastname,
      message:
        'Do you want to accept this request?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            let data = { id: order_data.id, status: 1 };
            this.db.acceptRequest(data).then((res: any) => {
              // this.userData = res.data;
              // this.userCard = true;
              // this.driveStatus = true;
              // this.serviceProvider.order = order_data;
              // console.log(res);
            });
            this.initsetTime();
            this.route.navigate(['menu/home']);
          }
        },
        // {
        //   text: 'Ignore',
        //   handler: () => {
        //     let data = { id: order_data.id, status: 3 };
        //     this.db.acceptRequest(data).then((res: any) => {
        //       console.log(res);
        //     });
        //     this.initsetTime();
        //     this.route.navigate(['menu/home']);
        //   }
        // },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            let data = { id: order_data.id, status: 2 };
            this.db.acceptRequest(data).then((res: any) => {
              // console.log(res);
            });
            this.initsetTime();
            this.route.navigate(['menu/home']);
          }
        }
      ]
    });
    return await alert.present();
    // const profileModal: any = await this.serviceProvider.cabModal(NotificationComponent,'backTransparent');
    // profileModal.present();
  }
  async showCanceledOnOrder(order_data){
    const alert = await this.alertCtrl.create({
      header: 'Canceled from ' + order_data.rider_id,
      message:
        'Sorry but ride was canceled by customer',
      buttons: [
        
        {
          text: 'OK',
          handler: () => {
            this.userCard = false;
            this.userData = null;
            this.serviceProvider.driverStatus = true;
            this.pickup = false;
            this.pickup_flage = false;
            this.initsetTime();
          }
        },
      ]
    });
    return await alert.present();
  }
  async showCompletedOnOrder(order_data){
    const alert = await this.alertCtrl.create({
      header: 'Request from ' + order_data.firstname +' '+ order_data.lastname,
      message:
        'Your ride has been successfully completed!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.userCard = false;
            this.userData = null;
            this.serviceProvider.driverStatus = true;
            this.pickup = false;
            this.pickup_flage = false;
            this.arrived = false;
            this.route.navigate(['feedbackgiven']);
            this.initsetTime();
          }
        }
      ]
    });
    return await alert.present();
  }

  sendComment() {
    // console.log(this.message)
    if (this.message != "") {
      this.http.post(hostApi, {message: this.message}).subscribe((res: any) => {
        this.message = '';
      });
    }
  }

  updateMap(data){
    this.lat = parseFloat(data.lat);
    this.lng = parseFloat(data.long);

    this.map.setCenter({lat:this.lat, lng:this.lng, alt:0});
    // this.markers.push({lat:this.lat, lng:this.lng, alt:0});

    this.lineCoordinates.push(new google.maps.LatLng(this.lat, this.lng));

    let lineCoordinatesPath = new google.maps.Polyline({
      path: this.lineCoordinates,
      geodesic: true,
      map: this.map,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
  }
  driverStatusChange(event, val) {
    // console.log('status', this.driveStatus, event, event.target.value, val);
    this.serviceProvider.driverStatus = this.driveStatus;

    let user = { user_id: this.user.id, status: this.driveStatus }
    this.db.onAuthStatusChanged(user).then((res: any) => {
      // console.log(res);
    });
  }
  async openLocationModal(){

  }

  completeRide() {
    let data = { id: this.serviceProvider.order.id, flag: 3 };
    this.db.completeRide(data).then(async(res: any) => {
      if(res.success){
        this.userCard = false;
        this.userData = null;
        this.serviceProvider.driverStatus = true;
        this.arrived = false;
        this.pickup = false;
        this.pickup_flage = false;
        this.route.navigate(['feedbackgiven']);
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message:
            res.error,
          buttons: [
            {
              text: 'OK',
              handler: () => {
                
              }
            }
          ]
        });
      }
    });
  }

  requestAccept() {
    this.route.navigate(['customer-detail']);
  }

  async requestIgnore() {
    this.route.navigate(['customerRequest']);
  }

  mapReady(a, event) {
    if (event) {
      // console.log('event if');
    }
  }
  discountAmount(){
    document.getElementById('discount_amount').setAttribute('type', 'text');
    this.discountFlag = true;
  }
  stripePay(){
    let data = {
      order_id: this.serviceProvider.order.id,
      amount: this.amount
    }
    this.db.stripePay(data).then((res: any) => {
      // console.log(res);
    });
    document.getElementById('discount_amount').setAttribute('type', 'hidden');
    this.discountFlag = false;
  }
  chat(){

  }
  cancelTrip(){
    let data = {
      id: this.serviceProvider.order.id
    }
    this.db.cancelTrip(data).then(async (res: any) => {
      if(res.success){
        const alert = await this.alertCtrl.create({
        header: 'canceled',
        message:
          res.success,
        buttons: [
          {
            text: 'OK',
            handler: () => {

            }
          }
        ]
      });
      await alert.present();
      this.userCard = false;
      this.userData = null;
      this.serviceProvider.driverStatus = true;
      this.pickup = false;
      this.arrived = false;
      this.pickup_flage = false;
      }
    });
  }
  arrivedTrip(){
    let data = {
      id: this.serviceProvider.order.id
    }
    this.db.arrivedTrip(data).then(async (res: any) => {
      if(res.success){
        this.arrived = true;
      }
    });
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}