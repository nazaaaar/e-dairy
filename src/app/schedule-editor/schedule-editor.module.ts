import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleEditorPageRoutingModule } from './schedule-editor-routing.module';

import { ScheduleEditorPage } from './schedule-editor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleEditorPageRoutingModule
  ],
  declarations: [ScheduleEditorPage]
})
export class ScheduleEditorPageModule {}
