import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassSearchModalPageRoutingModule } from './class-search-modal-routing.module';

import { ClassSearchModalPage } from './class-search-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassSearchModalPageRoutingModule
  ],
  declarations: [ClassSearchModalPage]
})
export class ClassSearchModalPageModule {}
