import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassLessonsPage } from './class-lessons.page';

const routes: Routes = [
  {
    path: '',
    component: ClassLessonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassLessonsPageRoutingModule {}
