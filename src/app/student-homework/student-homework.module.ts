import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentHomeworkPageRoutingModule } from './student-homework-routing.module';

import { StudentHomeworkPage } from './student-homework.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentHomeworkPageRoutingModule
  ],
  declarations: [StudentHomeworkPage]
})
export class StudentHomeworkPageModule {}
