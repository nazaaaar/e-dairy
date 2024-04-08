import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleTabsPageRoutingModule } from './schedule-tabs-routing.module';

import { ScheduleTabsPage } from './schedule-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleTabsPageRoutingModule
  ],
  declarations: [ScheduleTabsPage]
})
export class ScheduleTabsPageModule {}
