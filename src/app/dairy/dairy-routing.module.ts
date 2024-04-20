import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DairyPage } from './dairy.page';

const routes: Routes = [
  {
    path: '',
    component: DairyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DairyPageRoutingModule {}
