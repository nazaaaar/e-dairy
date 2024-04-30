import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  get loggedInUser(): any {
    return this._loggedInUser;
  }

  set loggedInUser(value: any) {
    this.storage.set('logged-in-user', value).then(() => {
      this._loggedInUser = value;
      this.updateAppPages(); // Update app pages when user is set
    });
  }
  private _loggedInUser: any;
  appPages: any[] = [];

  constructor(private storage: Storage, private router: Router) {
    this.initializeApp();
  }

  async ngOnInit(): Promise<void> {
    await this.loadLoggedInUser();
    if (!this._loggedInUser)await this.router.navigate(['/info']);
  }

  async initializeApp(): Promise<void> {
    await this.storage.create();
    this.updateAppPages();
  }

  async loadLoggedInUser(): Promise<void> {
    this._loggedInUser = await this.storage.get('logged-in-user');

    this.updateAppPages(); // Update app pages whenever user login status changes
  }

  updateAppPages(): void {
    if (this._loggedInUser && this._loggedInUser.role == 'teacher') {
      this.appPages = [
        { title: 'Розклад', url: '/schedule-tabs', icon: 'calendar' },
        { title: 'Щоденник', url: '/dairy', icon: 'create'},
        { title: 'Курси', url: '/teacher', icon: 'school'},
        {title: "Інформація", url:"/info", icon:"information"},
        { title: 'Вихід', action: 'logout', icon: 'log-out' },
      ];
    }
    else if (this._loggedInUser && this._loggedInUser.role == 'student') {
      this.appPages = [
        { title: 'Розклад', url: '/schedule-tabs', icon: 'calendar' },
        { title: 'Щоденник', url: '/dairy', icon: 'create'},
        { title: 'Курси', url: '/student', icon: 'school'},
        {title: "Інформація", url:"/info", icon:"information"},
        { title: 'Вихід', action: 'logout', icon: 'log-out' },
      ];
    }
    else {

      this.appPages = [
        {title: "Головна", url:"/info", icon:"information"},
        { title: 'Вхід', url: '/login', icon: 'log-in' },
        { title: 'Реєстрація', url: '/registration', icon: 'person-add' }
      ];
    }
  }


  logout(): void {
    this.storage.remove('logged-in-user').then(() => {
      this._loggedInUser = null;
      this.updateAppPages(); // Update app pages after logout
      this.router.navigate(['/info']);
    });
  }
}
