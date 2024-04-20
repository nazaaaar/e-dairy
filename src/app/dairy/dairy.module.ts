import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DairyPageRoutingModule } from './dairy-routing.module';

import { DairyPage } from './dairy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DairyPageRoutingModule
  ],
  declarations: [DairyPage]
})
export class DairyPageModule {}
