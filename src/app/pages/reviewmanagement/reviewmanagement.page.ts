import { Component, OnInit } from '@angular/core';
import { ServerService } from "../../services/server.service";
import { NavController } from '@ionic/angular';
import {hostApi} from "../../global";
@Component({
  selector: 'app-reviewmanagement',
  templateUrl: './reviewmanagement.page.html',
  styleUrls: ['./reviewmanagement.page.scss'],
})
export class ReviewmanagementPage implements OnInit {
  user: any;
  host_url: any;
  feedbacks: any=[{}];
  constructor(
    public navCtrl: NavController,
    private db: ServerService
  ) {
    this.host_url = hostApi + 'public/';
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.driverfeedbackView();
  }
  goToBack(){
    this.navCtrl.back();
  }
  driverfeedbackView() {
    const postData = {
      id: this.user.id
    };
    
    this.db.driverfeedbackView(postData).then((res:any) => {
      if(res === "failed"){
        return;
      }
      else {
        this.feedbacks = res.feedbacks;
      }
    });
  }
  // starstyle() {
  //   var number = 
  //   for(let i=1; i<6; i++){
  //     if(number >= i) {
  //       document.getElementById('star'+i).setAttribute('style', 'color: #fc8c14;');
  //     }
  //     else {
  //       document.getElementById('star'+i).setAttribute('style', 'color: #dedede;');
  //     }
  //   }
  // }
}
