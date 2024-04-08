import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentLessonPage } from './current-lesson.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentLessonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentLessonPageRoutingModule {}
