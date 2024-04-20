import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMarkPageRoutingModule } from './add-mark-routing.module';

import { AddMarkPage } from './add-mark.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMarkPageRoutingModule
  ],
  declarations: [AddMarkPage]
})
export class AddMarkPageModule {}
