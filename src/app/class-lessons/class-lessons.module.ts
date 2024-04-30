import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassLessonsPageRoutingModule } from './class-lessons-routing.module';

import { ClassLessonsPage } from './class-lessons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassLessonsPageRoutingModule
  ],
  declarations: [ClassLessonsPage]
})
export class ClassLessonsPageModule {}
