import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassSearchModalPage } from './class-search-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ClassSearchModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassSearchModalPageRoutingModule {}
