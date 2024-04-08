import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentLessonPageRoutingModule } from './current-lesson-routing.module';

import { CurrentLessonPage } from './current-lesson.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentLessonPageRoutingModule
  ],
  declarations: [CurrentLessonPage]
})
export class CurrentLessonPageModule {}
