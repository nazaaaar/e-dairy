import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLessonModalPageRoutingModule } from './add-lesson-modal-routing.module';

import { AddLessonModalPage } from './add-lesson-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLessonModalPageRoutingModule
  ],
  declarations: [AddLessonModalPage]
})
export class AddLessonModalPageModule {}
