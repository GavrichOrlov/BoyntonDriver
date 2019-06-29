import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ServerService } from "../../services/server.service";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-addnewvehicle',
  templateUrl: './addnewvehicle.page.html',
  styleUrls: ['./addnewvehicle.page.scss'],
})
export class AddnewvehiclePage implements OnInit {
  public value: any = '';
  public newvehicleData = [
    {
      label: 'Year',
      placeholder: 'Select Year',
      data: [{
        'name': '2000',
      },
      {
        'name': '2001',
      },
      {
        'name': '2002',
      },
      {
        'name': '2003',
      },
      {
        'name': '2004',
      },
      {
        'name': '2005',
      },
      {
        'name': '2006',
      },
      {
        'name': '2007',
      },
      {
        'name': '2008',
      },
      {
        'name': '2009',
      },
      {
        'name': '2010',
      },
      {
        'name': '2011',
      },
      {
        'name': '2012',
      },
      {
        'name': '2013',
      },
      {
        'name': '2014',
      },
      {
        'name': '2015',
      },
      {
        'name': '2016',
      },
      {
        'name': '2017',
      },
      {
        'name': '2018',
      }
      ]
    }, {
      label: 'color',
      placeholder: 'Select color',
      data: [{
        'name': 'Black',
      },
      {
        'name': 'Yellow',
      },
      {
        'name': 'Red',
      },
      {
        'name': 'White',
      }
      ]
    },
    {
      label: 'Booking Type',
      placeholder: 'Select Booking Type',
      data: [{
        'name': '7 seat',
      },
      {
        'name': '9 seat',
      },
      {
        'name': '4 seat',
      },
      {
        'name': '6 seat',
      },
      {
        'name': 'Auto-Rikshaw',
      },
      {
        'name': 'E-Rikshaw',
      }
      ]
    },
  ]
  valueName: any;
  user: any = {};
  cars: any = [{}];
  cartypeid: any;
  caryear: any;
  carcolor: any;
  booking_type: any;
  validations_form: FormGroup;
  constructor(
    public route: Router, 
    public navctrl: NavController,
    private db: ServerService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.carinfoGet();
    this.validations_form = this.formBuilder.group({
      carlicence: new FormControl('', Validators.compose([
        Validators.required
      ])),
      
    });
  }
  getValue(item: any, item1: any) {
    this.valueName = item
    console.log('selected valiue name', item1);
    if(item1 === 'Year'){this.caryear = item;}
    else if(item1 ==='color'){this.carcolor = item;}
    else if(item1 ==='Booking Type'){this.booking_type = item;}
  }
  openpageTRansition() {
    // this.route.navigate(['vehiclemanagement']);
    this.navctrl.back();

  }
  goToBack(){
    this.navctrl.back();
  }
  carinfoGet(){
    const postData = {
      id: this.user.id
    };
    this.db.carinfoGet(postData).then((res: any) => {
      console.log(res.cars);
      console.log(res.cars[0].car_name);
      this.cars = res.cars;
    });
  }
  getCartypeid(item: any) {
    this.cartypeid = item;
  }
  getCaryear(item: any) {
    this.caryear = item;
  }
  getCarcolor(item: any) {
    this.carcolor = item;
  }
  getCarbookingtype(item: any) {
    this.booking_type = item;
  }
  submitform(value:any){
    console.log(value);
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    const postData = {
      id: this.user.id,
      cartypeid: this.cartypeid,
      color: this.carcolor,
      seatcount: this.booking_type,
      carlicence: value.carlicence,
      registedate:dateTime
    };
    console.log(postData);
    this.db.carinfoPut(postData).then((res: any) => {
      console.log(res);
      if (res === "failed") {
        alert("Failed");
        return;
      }
      else {
        this.openpageTRansition();
      }
    });
  }
}
