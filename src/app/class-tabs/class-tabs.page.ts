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

    // Navigate to the corresponding route with the encoded name as parameter
    if (tab === 'class-students') {
      this.router.navigate(['class-tabs/class-students', encodedName]);
    } else if (tab === 'class-homework') {
      this.router.navigate(['class-tabs/class-homework', encodedName]);
    }
  }
}
