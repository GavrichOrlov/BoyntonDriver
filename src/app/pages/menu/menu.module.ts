import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'history', loadChildren: '../history/history.module#HistoryPageModule' },
      { path: 'invite', loadChildren: '../invite/invite.module#InvitePageModule' },
      { path: 'notifications', loadChildren: '../notifications/notifications.module#NotificationsPageModule' },
      { path: 'setting', loadChildren: '../setting/setting.module#SettingPageModule' },
      { path: 'wallet', loadChildren: '../wallet/wallet.module#WalletPageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
