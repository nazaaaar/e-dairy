import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentTabsPage } from './student-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: StudentTabsPage,
    children: [
      {
        path: 'student-lessons',
        loadChildren: () => import('../student-lessons/student-lessons.module').then( m => m.StudentLessonsPageModule)
      },
      {
        path: 'my-marks',
        loadChildren: () => import('../my-marks/my-marks.module').then( m => m.MyMarksPageModule)
      },
      {
        path: 'student-homework',
        loadChildren: () => import('../student-homework/student-homework.module').then( m => m.StudentHomeworkPageModule)
      },
      {
        path: '',
        redirectTo: '/student-tabs/student-lessons',
        pathMatch: 'full'
      },
    ]
  },

  {
    path: '',
    redirectTo: '/student-tabs/student-lessons',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentTabsPageRoutingModule {}
