import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMarkPage } from './add-mark.page';

const routes: Routes = [
  {
    path: '',
    component: AddMarkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMarkPageRoutingModule {}
