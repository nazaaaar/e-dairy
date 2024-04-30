import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentLessonsPage } from './student-lessons.page';

const routes: Routes = [
  {
    path: '',
    component: StudentLessonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentLessonsPageRoutingModule {}
