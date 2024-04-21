import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {

  userData: any = {};

  data = {
    email: '',
    password: '',
    role: '',
    firstName: '',
    lastName: ''
  };

  constructor(private storage: Storage, private alertController: AlertController,
              private router: Router) {
    this.loadUserData();
  }

  async loadUserData() {
    this.userData = await this.storage.get('userData') || {};
  }

  async register() {
    if (!this.validateRegistration()) {
      return; // Registration validation failed, abort registration process
    }

    const userId = this.data.email.toLowerCase();

    this.userData[userId] = {
      email: this.data.email,
      password: this.data.password,
      role: this.data.role,
      firstName: this.data.firstName,
      lastName: this.data.lastName
    };

    try {
      await this.storage.set('userData', this.userData);
      this.router.navigateByUrl('/login');
    } catch (error) {
      // Handle error
    }
  }

  validateRegistration(): boolean {
    const email = this.data.email.toLowerCase();
    const password = this.data.password;
    const firstName = this.data.firstName;
    const lastName = this.data.lastName;

     if (!this.data.role){
       return false;
     }

    if (!email.trim()) {
      this.presentAlert("Помилка", 'Емейл не повинен бути пустим');
      return false;
    }

    if (!firstName.trim() || !lastName.trim()) {
      this.presentAlert("Помилка", 'Ім\'я та прізвище не повинні бути пустими');
      return false;
    }

    // Check if email is already registered
    if (this.userData.hasOwnProperty(email)) {
      this.presentAlert("Помилка", 'Емейл вже зайнятий');
      return false;
    }

    // Check if password has at least 8 characters
    if (password.length < 8) {
      this.presentAlert("Помилка", 'Пароль має містити 8 символів');
      return false;
    }

    // Validation passed
    return true;
  }


  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Зрозуміло'],
    });

    await alert.present();
  }
}
