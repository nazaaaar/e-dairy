import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentLessonDetailsPage } from './student-lesson-details.page';

const routes: Routes = [
  {
    path: '',
    component: StudentLessonDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentLessonDetailsPageRoutingModule {}
