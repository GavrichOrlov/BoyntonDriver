import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { ServerService } from './services/server.service';
import {HttpClientModule} from "@angular/common/http";
import { Camera } from '@ionic-native/camera/ngx';
import {ImagePicker} from "@ionic-native/image-picker/ngx";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {
  NativePageTransitions,
  NativeTransitionOptions
} from '@ionic-native/native-page-transitions/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NotificationComponent } from './pages/notification/notification.component';
@NgModule({
  declarations: [AppComponent, NotificationComponent],
  entryComponents: [NotificationComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, AgmCoreModule.forRoot({
    apiKey: 'AIzaSyCnNMBSipK7BYeGXfAg-j_EeU3jWcUsDPs',
    libraries: ['places']
  })],
  providers: [
    StatusBar,
    SplashScreen,
    ServerService,
    Camera,
    Geolocation,
    ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser,
    NativePageTransitions,
    SocialSharing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
