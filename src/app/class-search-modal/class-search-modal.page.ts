import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Class } from '../models/class.model';
import { User } from '../models/user.interface';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-class-search-modal',
  templateUrl: './class-search-modal.page.html',
  styleUrls: ['./class-search-modal.page.scss'],
})
export class ClassSearchModalPage implements OnInit {
  @Input() classes!: Class[]; // Input property to receive fullClasses
  filteredClasses!: Class[]; // Array to hold filtered classes
  searchTerm: string = ''; // Search term entered by the user
  showDetailsMap: Map<number, boolean> = new Map(); // Map to track whether details are shown for each class
  loggedInUser!: User;

  constructor(private modalController: ModalController, private alertController: AlertController, private storage: Storage) { }

  async ngOnInit() {
    // Initialize filteredClasses with all classes initially
    this.filteredClasses = this.classes;
    // Populate showDetailsMap with false for each class
    this.filteredClasses.forEach((cls, index) => {
      this.showDetailsMap.set(index, false);
    });
    // Get the logged-in user from storage
    this.loggedInUser = await this.storage.get('logged-in-user');
  }

  dismiss() {
    // Dismiss the modal and pass the updated classes back to the parent component
    this.modalController.dismiss(this.filteredClasses);
  }

  // Implement search functionality
  filterClasses() {
    // Convert search term to lowercase for case-insensitive search
    const term = this.searchTerm.toLowerCase().trim();
    if (term === '') {
      // If search term is empty, display all classes
      this.filteredClasses = this.classes;
    } else {
      // Filter classes based on search term
      this.filteredClasses = this.classes.filter(cls =>
        cls.name.toLowerCase().includes(term) ||
        cls.subject.toLowerCase().includes(term) ||
        cls.teacherEmail.toLowerCase().includes(term)
      );
    }
    // Update showDetailsMap when classes are filtered
    this.showDetailsMap.clear();
    this.filteredClasses.forEach((cls, index) => {
      this.showDetailsMap.set(index, false);
    });
  }

  // Toggle visibility of additional details for a class
  toggleDetails(index: number) {
    this.showDetailsMap.set(index, !this.showDetailsMap.get(index));
  }

  // Add current student to the class
  addStudentToClass(cls: Class) {
    // Check if the student is already in the class
    if (!cls.students.find(student => student.email === this.loggedInUser.email)) {
      // Add the student to the class
      cls.students.push(this.loggedInUser);
      // Update the class in storage or perform any other necessary operations
      // For example: this.storage.set('classes', this.classes);
      // You might want to display a message to confirm that the student has been added
      this.presentAlert('Успіх!', 'Ви успішно приєдналися до курсу');
    } else {
      // Display a message indicating that the student is already in the class
      this.presentAlert('Отакої :(', 'Схоже, ви вже приєднані до цього класу');
    }
  }

  // Helper method to present an alert
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Зрозуміло']
    });
    await alert.present();
  }
}
