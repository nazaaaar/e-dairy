import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ClassStudentsPage} from "./class-students/class-students.page";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'schedule-tabs',
    pathMatch: 'full'
  },
  {
    path: 'schedule-tabs',
    loadChildren: () => import('./schedule-tabs/schedule-tabs.module').then( m => m.ScheduleTabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'dairy',
    loadChildren: () => import('./dairy/dairy.module').then( m => m.DairyPageModule)
  },
  {
    path: 'dairy-detail',
    loadChildren: () => import('./dairy-detail/dairy-detail.module').then( m => m.DairyDetailPageModule)
  },
  {
    path: 'teacher',
    loadChildren: () => import('./teacher/teacher.module').then( m => m.TeacherPageModule)
  },
  {
    path: 'add-mark',
    loadChildren: () => import('./add-mark/add-mark.module').then( m => m.AddMarkPageModule)
  },

  {
    path: 'class-creation-modal',
    loadChildren: () => import('./class-creation-modal/class-creation-modal.module').then( m => m.ClassCreationModalPageModule)
  },
  { path: 'class-students/:name', component: ClassStudentsPage },
  {
    path: 'add-student-modal',
    loadChildren: () => import('./add-student-modal/add-student-modal.module').then( m => m.AddStudentModalPageModule)
  },
  {
    path: 'class-tabs',
    loadChildren: () => import('./class-tabs/class-tabs.module').then( m => m.ClassTabsPageModule)
  },
  {
    path: 'add-homework-modal',
    loadChildren: () => import('./add-homework-modal/add-homework-modal.module').then( m => m.AddHomeworkModalPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then( m => m.StudentPageModule)
  },

  {
    path: 'student-tabs',
    loadChildren: () => import('./student-tabs/student-tabs.module').then( m => m.StudentTabsPageModule)
  },
  {
    path: 'class-search-modal',
    loadChildren: () => import('./class-search-modal/class-search-modal.module').then( m => m.ClassSearchModalPageModule)
  },
  {
    path: 'add-lesson-modal',
    loadChildren: () => import('./add-lesson-modal/add-lesson-modal.module').then( m => m.AddLessonModalPageModule)
  },

  {
    path: 'student-lesson-details',
    loadChildren: () => import('./student-lesson-details/student-lesson-details.module').then( m => m.StudentLessonDetailsPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
