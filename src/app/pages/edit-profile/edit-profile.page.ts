import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ServerService} from "../../services/server.service";
import {ImagePicker} from "@ionic-native/image-picker/ngx";
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  public profileDetails: any = {};
  photos: any = [];
  user: any = {};
  validations_form: FormGroup;
  errorMessage: string;
  successMessage: string;
  firstname: any;
  lastname: any;
  phonenumber: any;
  city: any;
  sss: any;
  validation_messages = {
      'firstname': [
          {type: 'required', message: 'Firstname is required.'}
      ],
      'lastname': [
          {type: 'required', message: 'Lastname is required.'}
      ],
      'phonenumber': [
          {type: 'required', message: 'Phone number is required.'}
      ],
      'city': [
          {type: 'required', message: 'City is required.'}
      ]
  };
  constructor(
    public alertCtrl: AlertController,
    private db: ServerService,
    private formBuilder: FormBuilder,
    public actionCtrl: ActionSheetController,
    public camera: Camera,
    private imagePicker: ImagePicker,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.validations_form = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([
          Validators.required,
      ])),
      lastname: new FormControl('', Validators.compose([
          Validators.required,
      ])),
      city: new FormControl('', Validators.compose([
          Validators.required,
      ])),
      phonenumber: new FormControl('', Validators.compose([
          Validators.required
      ]))
    });
    this.profileDetails = {
      firstName: 'John',
      lastName: 'Doe',
      profileImage: '../../assets/driver.jpeg',
      username: 'John Doe',
      memberType: 'Gold Member',
      phoneNo: '+91-0000-000-000',
      email: 'johnDeo@gmail.com',
      gender: 'Male',
      birthday: 'April 28,1996'
    }
  }
  dismiss() {
    this.navCtrl.back();
  }

  updateProfile() {
    console.log('Updated Profile', this.profileDetails);
    this.navCtrl.back();
  }

  async editPhoto() {
    const action = await this.actionCtrl.create({
      buttons: [
      {
        text: 'Take a picture',
        role: 'destructive',
        cssClass: 'buttonCss',
        handler: () => {
          this.openCamera();
          console.log('Take a picture clicked');
        }
      }, {
        text: 'Choose a picture',
        handler: () => {
          this.hasReadPermission();
          console.log('Share clicked');
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'buttonCss_Cancel',

        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await action.present();
  }
  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    await this.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(base64Image)
    }, (err) => {
      // Handle error
      console.log(err)
    });
  }


  updateItem(newitem) {
    const app = this;
    //console.log(app.user.id);
    //console.log(newitem.firstname);
    this.firstname = newitem.firstname;
    if(this.firstname == '')
        this.firstname = app.user.firstname;
    
    this.lastname = newitem.lastname;
    if(this.lastname == '')
        this.lastname = app.user.lastname;
    this.phonenumber = newitem.phonenumber;
    if(this.phonenumber == '')
        this.phonenumber = app.user.phonenubmer;
    this.city = newitem.city;
    if(this.city == '')
        this.city = app.user.city;
                            
    const postData = {
        id: app.user.id,
        firstname: this.firstname,
        lastname: this.lastname,
        phonenumber: this.phonenumber,
        city: this.city
    };
    console.log(this.validations_form.value);
    console.log(this.user.profile);
    this.db.updateitem(postData).then((res: any) => {
        console.log(res);
        this.sss = JSON.parse(localStorage.getItem("userid"));
        
        this.errorMessage = "";
        this.successMessage = "Your account has been updated.";
    });
  }

  async presentAlertConfirm(newitem) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: '<strong>Do you update user info?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.updateItem(newitem);
          }
        }
      ]
    });

    await alert.present();
  }
  uploadImage() {
    const app = this;
    this.imagePicker.getPictures({
        maximumImagesCount: 1,
        outputType: 1
    }).then((results) => {
        for (let i = 0; i < results.length; i++) {
            app.db.uploadProfileImage({id: app.user.id, profile: results[i]}).subscribe(res1 => {
                this.user.profile = "data:image/jpeg;base64," + results[i];
            });
        }
    }, (err) => {
    });
  }

  hasReadPermission() {
      this.imagePicker.hasReadPermission().then(res => {
          if (res) {
              this.uploadImage();
          } else {
              this.requestReadPermission();
          }
      });
  }

  requestReadPermission() {
      this.imagePicker.requestReadPermission();
      this.uploadImage();
  }

}
