import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassHomeworkPage } from './class-homework.page';

const routes: Routes = [
  {
    path: '',
    component: ClassHomeworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassHomeworkPageRoutingModule {}
