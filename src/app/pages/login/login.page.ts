import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {ServerService} from "../../services/server.service";
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  spinner: boolean = false;
  disabled: boolean = false;
  toast: any;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private db: ServerService,
    public menuCtrl: MenuController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
  showToast() {
    this.toast = this.toastController.create({
      message: 'Server connecting',
      duration: 20000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }
  HideToast(){
    this.toast = this.toastController.dismiss();
  }

  login(newitem) {
    this.showToast();
    this.db.login(newitem).then((res: any) => {
      if (res === "failed") {
        alert("Error in Login");
        return;
      }
      this.HideToast();
      localStorage.setItem("user", JSON.stringify(res.user));
      this.navCtrl.navigateForward("/menu/home");
    }, err => {
      
      console.log(err);
      this.errorMessage = err.message;
    });

  }
  goToBack(){
    this.navCtrl.navigateBack('/startpage');
  }
}
