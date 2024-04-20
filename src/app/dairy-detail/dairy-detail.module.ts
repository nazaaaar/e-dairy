import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DairyDetailPageRoutingModule } from './dairy-detail-routing.module';

import { DairyDetailPage } from './dairy-detail.page';
import {MaskitoDirective} from "@maskito/angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DairyDetailPageRoutingModule,
    MaskitoDirective
  ],
  declarations: [DairyDetailPage]
})
export class DairyDetailPageModule {}
