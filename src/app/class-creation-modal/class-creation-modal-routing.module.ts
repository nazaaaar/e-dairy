import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassCreationModalPage } from './class-creation-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ClassCreationModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassCreationModalPageRoutingModule {}
