import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyMarksPageRoutingModule } from './my-marks-routing.module';

import { MyMarksPage } from './my-marks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyMarksPageRoutingModule
  ],
  declarations: [MyMarksPage]
})
export class MyMarksPageModule {}
