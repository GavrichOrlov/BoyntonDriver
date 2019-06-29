import { Component, OnInit } from '@angular/core';
import { IondriverServicesService } from '../../services/iondriver-services.service';
import { ServerService } from "../../services/server.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
declare var google;
@Component({
  selector: 'app-feedbackgiven',
  templateUrl: './feedbackgiven.page.html',
  styleUrls: ['./feedbackgiven.page.scss'],
})
export class FeedbackgivenPage implements OnInit {
  public lat: any;
  public lng: any;
  zoom: number = 12;
  user: any = {};
  public markerUrl = '../../assets/markerPin.png';
  lineCoordinates = [];
  street: any;
  building: any;
  block: any;
  public origin: any;
  public destination: any;
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
  dir: { origin: { lat: number; lng: number; }; destination: { lat: number; lng: number; }; };
  color = ['black', 'black', 'black'];
  feedbackscore: any;
  validations_form: FormGroup;
  constructor(
    private db: ServerService,
    public serviceProvider: IondriverServicesService,
    public geolocation: Geolocation,
    public route: Router,
    private formBuilder: FormBuilder
  ) {
    this.getCurrentLoaction();
  }
  async getCurrentLoaction() {
    this.geolocation.getCurrentPosition().then((resp) => {
      const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude
      this.serviceProvider.directionlat = this.lat
      this.serviceProvider.directionlng = this.lng
      // this.map = new google.maps.Map(mapOptions);
      this.getGeoLocation(resp.coords.latitude, resp.coords.longitude);
      this.lineCoordinates.push(new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude));
    }).catch((error) => {
      // this.initsetTime();
      console.log('Error getting location', error);
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
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.validations_form = this.formBuilder.group({
      feedback_text: new FormControl('', Validators.compose([
        Validators.required
      ])),
      
    });
  }
  mapReady(a, event) {
    if (event) {
      // console.log('event if');
    }
  }
  markerDragEnd(m: marker, $event: MouseEvent) {
    // console.log('dragEnd', m, $event);
  }

  starevent(number) {
    console.log(number);
    this.feedbackscore = number;
    for(let i=1; i<6; i++){
      if(number >= i) {
        document.getElementById('star'+i).setAttribute('style', 'color: #fc8c14;');
      }
      else {
        document.getElementById('star'+i).setAttribute('style', 'color: #dedede;');
      }
    }
  }
  givenfeedback(formcontent){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    const postData = {
      id: this.user.id,
      riderid: this.serviceProvider.order.rider_id,
      orderid: this.serviceProvider.order.id,
      feedback_text: formcontent.feedback_text,
      feedback_score: this.feedbackscore,
      feedback_date: dateTime,
    };
    // console.log(this.serviceProvider.driver_id);
    this.db.drivergivenfeedback(postData).then((res: any) => {
      document.getElementById('feedback_text').setAttribute('value', '');
      this.serviceProvider.order = '';
      this.route.navigate(['menu/home']);
    });
  }  
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}