import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddHomeworkModalPageRoutingModule } from './add-homework-modal-routing.module';

import { AddHomeworkModalPage } from './add-homework-modal.page';
import {MaskitoDirective} from "@maskito/angular";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddHomeworkModalPageRoutingModule,
        MaskitoDirective
    ],
  declarations: [AddHomeworkModalPage]
})
export class AddHomeworkModalPageModule {}
