import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import {AlertController} from "@ionic/angular";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  userData: any = {};

  data = {
    email: '',
    password: ''
  };

  constructor(
    private storage: Storage,
    private router: Router,
    private alertController: AlertController,
    private appComponent: AppComponent
  ) { }

  async ngOnInit() {

  }

  async loadUserData() {
    this.userData = await this.storage.get('userData') || {};
  }

  async login() {
    await this.loadUserData()

    const email = this.data.email.toLowerCase();
    const password = this.data.password;

    if (!email.trim() || !password.trim()) {
      await this.presentAlert('Не вдалось ввійти', 'Логін і пароль не мають бути пустими');
      return;
    }

    if (this.userData[email] && this.userData[email].password === password) {

      this.appComponent.loggedInUser = this.userData[email];
      // Redirect to home page or any other desired page after login
      await this.router.navigateByUrl('/schedule-tabs');
    } else {
      // Invalid credentials
      await this.presentAlert('Не вдалось ввійти', 'Не правильний логін або пароль');
    }
  }

  async presentAlert(header: string, message: string ) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Зрозуміло'],
    });

    await alert.present();
  }
}
