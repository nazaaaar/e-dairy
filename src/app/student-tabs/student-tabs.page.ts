import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-student-tabs',
  templateUrl: './student-tabs.page.html',
  styleUrls: ['./student-tabs.page.scss'],
})
export class StudentTabsPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
       null;
    }

  switchToTab(tab: string) {
    const encodedName = localStorage.getItem('class-name-encoded');

    if (tab === 'student-lessons') {
      this.router.navigate(['student-tabs/student-lessons', {
        className: encodedName
      }]);
    }
    else if (tab === 'my-marks') {
      this.router.navigate(['student-tabs/my-marks', {
        className: encodedName
      }]);
    } else if (tab === 'student-homework') {
      this.router.navigate(['student-tabs/student-homework',{
        className: encodedName
      }]);
    }
  }

}
