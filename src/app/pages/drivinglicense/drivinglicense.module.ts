import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DrivinglicensePage } from './drivinglicense.page';

const routes: Routes = [
  {
    path: '',
    component: DrivinglicensePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DrivinglicensePage]
})
export class DrivinglicensePageModule {}
