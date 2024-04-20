import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassStudentsPageRoutingModule } from './class-students-routing.module';

import { ClassStudentsPage } from './class-students.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassStudentsPageRoutingModule
  ],
  declarations: [ClassStudentsPage]
})
export class ClassStudentsPageModule {}
