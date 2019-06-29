import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'startpage', pathMatch: 'full' },
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'startpage', loadChildren: './pages/startpage/startpage.module#StartpagePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  // { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  // { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  // { path: 'history', loadChildren: './pages/history/history.module#HistoryPageModule' },
  { path: 'contact-us', loadChildren: './pages/contact-us/contact-us.module#ContactUsPageModule' },
  // { path: 'invite', loadChildren: './pages/invite/invite.module#InvitePageModule' },
  { path: 'invitefriends', loadChildren: './pages/invitefriends/invitefriends.module#InvitefriendsPageModule' },
  { path: 'documentmanagement', loadChildren: './pages/documentmanagement/documentmanagement.module#DocumentmanagementPageModule' },
  { path: 'vehiclemanagement', loadChildren: './pages/vehiclemanagement/vehiclemanagement.module#VehiclemanagementPageModule' },
  { path: 'terms-condictions', loadChildren: './pages/terms-condictions/terms-condictions.module#TermsCondictionsPageModule' },
  { path: 'addnewvehicle', loadChildren: './pages/addnewvehicle/addnewvehicle.module#AddnewvehiclePageModule' },
  { path: 'drivinglicense', loadChildren: './pages/drivinglicense/drivinglicense.module#DrivinglicensePageModule' },
  // { path: 'wallet', loadChildren: './pages/wallet/wallet.module#WalletPageModule' },
  { path: 'paymentmethod', loadChildren: './pages/paymentmethod/paymentmethod.module#PaymentmethodPageModule' },
  { path: 'feedbackgiven', loadChildren: './pages/feedbackgiven/feedbackgiven.module#FeedbackgivenPageModule' },
  { path: 'reviewmanagement', loadChildren: './pages/reviewmanagement/reviewmanagement.module#ReviewmanagementPageModule' },
  // { path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule' },
  // { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
