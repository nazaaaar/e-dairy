import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {Class} from "../models/class.model";

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  allClasses: any;

  constructor(private router: Router,
              private storage: Storage,) { }

  viewClassStudents(selectedClass: Class) {
    const encodedName = encodeURIComponent(selectedClass.name);
    localStorage.setItem('class-name-encoded',encodedName);
    this.router.navigate(['/student-tabs/my-marks',{
      className: encodedName
    }]);
  }

  async loadClasses() {
    const loggedInUser = await this.storage.get('logged-in-user');

    if (loggedInUser) {
      const loggedInUserEmail = loggedInUser.email;

      const storedClasses = await this.storage.get('classes');

      if (storedClasses) {
        this.allClasses = storedClasses.filter((cls: Class) => cls.students.some(student => student.email === loggedInUserEmail));
      }
    }

  }
  ngOnInit() {
    this.loadClasses();
  }


}
