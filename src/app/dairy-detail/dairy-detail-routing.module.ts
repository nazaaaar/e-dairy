import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DairyDetailPage } from './dairy-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DairyDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DairyDetailPageRoutingModule {}
