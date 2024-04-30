import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-tabs',
  templateUrl: './class-tabs.page.html',
  styleUrls: ['./class-tabs.page.scss'],
})
export class ClassTabsPage {

  constructor(private router: Router) {}

  switchToTab(tab: string) {
    const encodedName = localStorage.getItem('class-name-encoded'); // Set the encoded name in localStorage

    if (tab === 'class-lessons') {
      this.router.navigate(['class-tabs/class-lessons', encodedName]);
    }
    else if (tab === 'class-students') {
      this.router.navigate(['class-tabs/class-students', encodedName]);
    } else if (tab === 'class-homework') {
      this.router.navigate(['class-tabs/class-homework', encodedName]);
    }
  }
}
