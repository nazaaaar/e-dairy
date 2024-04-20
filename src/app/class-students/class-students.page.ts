import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {ModalController} from '@ionic/angular';

import {Class} from '../models/class.model';
import {User} from "../models/user.interface";
import {AddStudentModalPage} from "../add-student-modal/add-student-modal.page";

@Component({
  selector: 'app-class-students',
  templateUrl: './class-students.page.html',
  styleUrls: ['./class-students.page.scss'],
})
export class ClassStudentsPage implements OnInit {
  className: string | null = null;
  classDetails: Class | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.className = decodeURIComponent(<string>params.get('name'));
      this.loadClassDetails();
    });
  }

  async loadClassDetails() {
    const storedClasses: Class[] | null = await this.storage.get('classes');

    if (storedClasses && this.className) {
      this.classDetails = storedClasses.find(cls => cls.name === this.className);
    }
  }

  async deleteStudent(studentEmail: string) {
    if (this.classDetails && this.classDetails.students) {
      this.classDetails.students = this.classDetails.students.filter((student: any) => student.email !== studentEmail);
      const storedClasses: Class[] | null = await this.storage.get('classes');
      if (storedClasses) {
        const updatedClasses = storedClasses.map(cls => {
          if (cls.name === this.className) {
            return this.classDetails;
          }
          return cls;
        });
        await this.storage.set('classes', updatedClasses);
      }
    }
  }


  async openAddStudentModal() {
    const modal = await this.modalController.create({
      component: AddStudentModalPage,
      componentProps: {},
      backdropDismiss: true,
      initialBreakpoint: 0.4,
      breakpoints: [0, 0.4, 0.8, 1]
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.role === 'success' && result.data) {
        const newStudent: User = result.data;
        if (this.classDetails && this.classDetails.students) {
          // Check if the student's email is already added to the class
          const isAlreadyAdded = this.classDetails.students.some(student => student.email === newStudent.email);
          if (!isAlreadyAdded) {
            this.classDetails.students.push(newStudent);
            const storedClasses: Class[] | null = await this.storage.get('classes');
            if (storedClasses) {
              const updatedClasses = storedClasses.map(cls => {
                if (cls.name === this.className) {
                  return this.classDetails;
                }
                return cls;
              });
              await this.storage.set('classes', updatedClasses);
            }
          } else {
            // Handle case where student's email is already added
            console.log('Student with this email is already added to the class.');
          }
        }
      }
    });

    await modal.present();
  }

  redirectToAddMark(student: User) {
    if (this.classDetails){
      const encodedEmail = encodeURIComponent(student.email);
      const encodedName = encodeURIComponent(this.classDetails.name);
    this.router.navigate(['/add-mark', {
      studentId: encodedEmail,
      className: encodedName
    }]);}
  }
}
