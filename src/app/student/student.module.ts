import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentPageRoutingModule } from './student-routing.module';
import { StudentPage } from './student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Import IonicModule instead of individual components
    StudentPageRoutingModule
  ],
  declarations: [StudentPage]
})
export class StudentPageModule {}
