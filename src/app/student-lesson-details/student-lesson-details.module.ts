import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentLessonDetailsPageRoutingModule } from './student-lesson-details-routing.module';

import { StudentLessonDetailsPage } from './student-lesson-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentLessonDetailsPageRoutingModule
  ],
  declarations: [StudentLessonDetailsPage]
})
export class StudentLessonDetailsPageModule {}
