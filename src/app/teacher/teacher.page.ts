import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController, ActionSheetController } from '@ionic/angular';

import { Class } from '../models/class.model';
import { ClassCreationModalPage } from '../class-creation-modal/class-creation-modal.page';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.page.html',
  styleUrls: ['./teacher.page.scss'],
})
export class TeacherPage implements OnInit {
  teacherEmail!: string; // Assuming teacher is identified by email
  allClasses: Class[] = []; // Array to store all classes
  teacherClasses: Class[] = []; // Array to store only the classes assigned to the teacher

  constructor(
    private router: Router,
    private storage: Storage,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.loadTeacherEmail();
    this.loadClasses();
  }

  async loadTeacherEmail() {
    this.teacherEmail = (await this.storage.get('logged-in-user')).email; // Assuming logged-in user is the teacher
  }

  async loadClasses() {
    const storedClasses = await this.storage.get('classes');

    if (storedClasses) {
      this.allClasses = storedClasses;
      // Filter classes assigned to the logged-in teacher
      this.teacherClasses = this.allClasses.filter((cls: Class) => cls.teacherEmail ? cls.teacherEmail === this.teacherEmail : false);
    }
  }

  async openClassCreationModal() {
    const modal = await this.modalController.create({
      component: ClassCreationModalPage
    });
    modal.onDidDismiss().then(async (data) => {
      if (data && data.data) {
        const newClass: Class = data.data;
        newClass.teacherEmail = this.teacherEmail; // Assign teacher's email to the new class
        this.allClasses.push(newClass); // Add the new class to the array of all classes
        this.teacherClasses.push(newClass); // Add the new class to the array of teacher's classes
        await this.storage.set('classes', this.allClasses); // Save all classes to storage
      }
    });
    return await modal.present();
  }

  async deleteClass(classToDelete: Class) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Ви впевнені?",
      buttons: [
        {
          text: 'Так',
          role: 'confirm',
          handler: async () => {
            // Filter out the class to delete from both arrays
            this.allClasses = this.allClasses.filter(cls => cls !== classToDelete);
            this.teacherClasses = this.teacherClasses.filter(cls => cls !== classToDelete);
            await this.storage.set('classes', this.allClasses); // Save all classes to storage
            await this.router.navigate(['/teacher']);
          }
        },
        {
          text: 'Відміна',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  viewClassStudents(selectedClass: Class) {
    // Encode the selected class name before navigating
    const encodedName = encodeURIComponent(selectedClass.name);
    localStorage.setItem('class-name-encoded',encodedName);
    this.router.navigate(['/class-tabs/class-students', encodedName]);
  }
}
