import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DocumentmanagementPage } from './documentmanagement.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentmanagementPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DocumentmanagementPage]
})
export class DocumentmanagementPageModule {}
