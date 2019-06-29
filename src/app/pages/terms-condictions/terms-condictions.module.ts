import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TermsCondictionsPage } from './terms-condictions.page';

const routes: Routes = [
  {
    path: '',
    component: TermsCondictionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TermsCondictionsPage]
})
export class TermsCondictionsPageModule {}
