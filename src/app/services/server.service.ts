import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {hostApi} from "../global";
import {Observable} from "rxjs/index";
const OPTIONS = {
    headers: new HttpHeaders({
        "Content-Type": "application/json"
    })
};
@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }
  login(value) {
    const postData = {
        email: value.email,
        password: value.password
    };
    // return this.http.post("http://letsride.work/driversignin", postData, OPTIONS).toPromise();
    return this.http.post(hostApi + "driversignin", postData, OPTIONS).toPromise();
  }
  logout() {
      const postData = {
          value: "logout"
      };
      return this.http.post(hostApi + "driverlogout", postData, OPTIONS).toPromise();
  }
  create(value): any {
    const postData = {
        firstname: value.firstname,
        lastname: value.lastname,
        email: value.email,
        password: value.password,
        phonenumber: value.phonenumber,
        city: value.city
    };
    console.log(postData);
    return this.http.post(hostApi + "driversignup", postData, OPTIONS).toPromise();
  }

  update(value) {
    const postData = {
        profile: value.email,
        password: value.password
    };
    return this.http.post(hostApi + "driversignin", postData, OPTIONS).toPromise();
  }

  uploadProfileImage(value: any): Observable<any> {
      return this.http.post(hostApi + "driveruploadprofile", value, OPTIONS);
  }
  
  getriderLocation(postData){
    return this.http.post(hostApi + "getriderLocation", postData, OPTIONS).toPromise();
  }
  checkStatus(postData){
    return this.http.post(hostApi + "checkstatus", postData, OPTIONS).toPromise();
  }
  onAuthStatusChanged(postData){
    return this.http.post(hostApi + "authstatuschang", postData, OPTIONS).toPromise();
  }
  cancelTrip(postData){
    return this.http.post(hostApi + "canceltripbydriver", postData, OPTIONS).toPromise();
  }
  arrivedTrip(postData){
    return this.http.post(hostApi + "arrivedtrip", postData, OPTIONS).toPromise();
  }
  completeRide(postData){
    return this.http.post(hostApi + "completeride", postData, OPTIONS).toPromise();
  }
  acceptRequest(postData){
    return this.http.post(hostApi + "acceptrequest", postData, OPTIONS).toPromise();
  }
  getOrderLocation(postData){
    return this.http.post(hostApi + "getorderdata", postData, OPTIONS).toPromise();
  }
  stripePay(postData){
    return this.http.post(hostApi + "stripepaydriver", postData, OPTIONS).toPromise();
  }
  updateitem(postData): any {
      // const postData = {
      //     id: id,
      //     firstname: value.firstname,
      //     lastname: value.lastname,
      //     phonenumber: value.phonenumber,
      //     city: value.city
      // };
      return this.http.post(hostApi + "driverupdate", postData, OPTIONS).toPromise();
  }
  //bako added
  drivergivenfeedback(postData): any {
    return this.http.post(hostApi + "drivergivenfeedback", postData, OPTIONS).toPromise();
  }
  driverhistory(postData): any {
    return this.http.post(hostApi + "driverhistory", postData, OPTIONS).toPromise();
  }
  carinfoGet(postData): any {
    return this.http.post(hostApi + "carinfoGet", postData, OPTIONS).toPromise();
  }
  carinfoPut(postData): any {
    return this.http.post(hostApi + "carinfoPut", postData, OPTIONS).toPromise();
  }
  carinfoGetbyID(postData): any {
    return this.http.post(hostApi + "carinfoGetbyID", postData, OPTIONS).toPromise();
  }
  carActive(postData): any {
    return this.http.post(hostApi + "carActive", postData, OPTIONS).toPromise();
  }
  driverfeedbackView(postData): any {
    return this.http.post(hostApi + "driverfeedbackView", postData, OPTIONS).toPromise();
  }
}
