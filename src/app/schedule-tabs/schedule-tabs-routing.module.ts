import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleTabsPage } from './schedule-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleTabsPage,
    children: [
      {
        path: 'current-lesson',
        loadChildren: () => import('../current-lesson/current-lesson.module').then( m => m.CurrentLessonPageModule)
      },
      {
        path: 'schedule-editor',
        loadChildren: () => import('../schedule-editor/schedule-editor.module').then( m => m.ScheduleEditorPageModule)
      },
      {
        path: '',
        redirectTo: '/schedule-tabs/current-lesson',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/schedule-tabs/current-lesson',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleTabsPageRoutingModule {}
