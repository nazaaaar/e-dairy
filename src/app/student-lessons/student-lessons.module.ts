import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentLessonsPageRoutingModule } from './student-lessons-routing.module';

import { StudentLessonsPage } from './student-lessons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentLessonsPageRoutingModule
  ],
  declarations: [StudentLessonsPage]
})
export class StudentLessonsPageModule {}
