import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassCreationModalPageRoutingModule } from './class-creation-modal-routing.module';

import { ClassCreationModalPage } from './class-creation-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassCreationModalPageRoutingModule
  ],
  declarations: [ClassCreationModalPage]
})
export class ClassCreationModalPageModule {}
