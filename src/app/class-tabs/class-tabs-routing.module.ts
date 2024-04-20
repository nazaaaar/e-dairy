import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassTabsPage } from './class-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: ClassTabsPage,
    children: [
      {
        path: 'class-students/:name',
        loadChildren: () => import('../class-students/class-students.module').then( m => m.ClassStudentsPageModule)
      },
      {
        path: 'class-homework/:name',
        loadChildren: () => import('../class-homework/class-homework.module').then( m => m.ClassHomeworkPageModule)
      },
      {
        path: '',
        redirectTo: '/class-tabs/class-students',
        pathMatch: 'full'
      },
    ]
  },

  {
    path: '',
    redirectTo: '/class-tabs/class-students',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassTabsPageRoutingModule {}
