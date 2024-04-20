import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentHomeworkPage } from './student-homework.page';

const routes: Routes = [
  {
    path: '',
    component: StudentHomeworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentHomeworkPageRoutingModule {}
