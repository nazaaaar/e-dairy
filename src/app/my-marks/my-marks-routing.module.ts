import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyMarksPage } from './my-marks.page';

const routes: Routes = [
  {
    path: '',
    component: MyMarksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMarksPageRoutingModule {}
