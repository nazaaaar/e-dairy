import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassHomeworkPageRoutingModule } from './class-homework-routing.module';

import { ClassHomeworkPage } from './class-homework.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassHomeworkPageRoutingModule
  ],
  declarations: [ClassHomeworkPage]
})
export class ClassHomeworkPageModule {}
