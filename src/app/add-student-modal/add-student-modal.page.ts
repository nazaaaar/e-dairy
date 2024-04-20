import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../models/user.interface';
import { ModalController } from '@ionic/angular';
import { Class } from '../models/class.model'

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.page.html',
  styleUrls: ['./add-student-modal.page.scss'],
})
export class AddStudentModalPage implements OnInit {
  @Input() currentClass!: Class;
  searchTerm: string = '';
  students: User[] = [];
  filteredStudents: User[] = [];
  selectedStudent!: User;

  constructor(private storage: Storage, private modalController: ModalController) { }

  ngOnInit() {
    this.loadStudents();
  }

  async loadStudents() {
    const userData = await this.storage.get('userData') as User[];
    if (userData) {
      // Filter users with role 'student'
      this.students = Object.values(userData).filter((user: User) => user.role === 'student');
      this.filterStudents();
    }
  }

  filterStudents() {
    if (!this.searchTerm) {
      this.filteredStudents = this.students;
    } else {
      this.filteredStudents = this.students.filter((student: User) =>
        (student.firstName.toLowerCase().includes(this.searchTerm) ||
          student.lastName.toLowerCase().includes(this.searchTerm))
      );
    }
  }

  searchStudents(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchTerm = searchTerm;
    this.filterStudents();
  }

  selectStudent(student: User) {
    this.selectedStudent = student;
  }

  async closeModal() {
    await this.modalController.dismiss(this.selectedStudent, 'success');
  }

}
