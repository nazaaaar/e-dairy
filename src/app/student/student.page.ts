import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { Class } from "../models/class.model";
import { Homework } from "../models/homework";

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  allClasses: any;
  colorMap: Map<string, string> = new Map(); // Modify the type of Map

  constructor(private router: Router, private storage: Storage) { }

  viewClassStudents(selectedClass: Class) {
    const encodedName = encodeURIComponent(selectedClass.name);
    localStorage.setItem('class-name-encoded', encodedName);
    this.router.navigate(['/student-tabs/my-marks', {
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

        // Populate colorMap with colors for each class
        this.allClasses.forEach((cls: Class) => {
          this.colorMap.set(cls.name, this.getNextColor());
        });
      }
    }
  }

  ngOnInit() {
    this.loadClasses();
  }

  colorIndex: number = 0;
  getNextColor(): string {
    const colors = ['#FF5733', '#ffdd33', '#ff9933', '#ff337a']; // Array of colors
    const color = colors[this.colorIndex];
    this.colorIndex = (this.colorIndex + 1) % colors.length; // Increment color index and wrap around if needed
    return color;
  }

  getColor(className: string): string {
    return this.colorMap.get(className) || ''; // Return color from the color map
  }
}
