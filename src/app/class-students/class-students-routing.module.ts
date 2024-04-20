import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassStudentsPage } from './class-students.page';

const routes: Routes = [
  {
    path: '',
    component: ClassStudentsPage
  },
  {
    path: ':name', // Define the parameter in the path
    component: ClassStudentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassStudentsPageRoutingModule {}
