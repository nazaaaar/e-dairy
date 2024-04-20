import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherPage } from './teacher.page';
import {ClassStudentsPage} from "../class-students/class-students.page";

const routes: Routes = [
  {
    path: '',
    component: TeacherPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherPageRoutingModule {}
