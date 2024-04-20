import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Class } from '../models/class.model';

@Component({
  selector: 'app-class-creation-modal',
  templateUrl: './class-creation-modal.page.html',
  styleUrls: ['./class-creation-modal.page.scss'],
})
export class ClassCreationModalPage {
  newClass: Class = new Class(); // Initialize with empty values

  constructor(private modalController: ModalController) { }

  closeModal() {
    this.modalController.dismiss();
  }

  createClass() {
    // Check if class name and subject are provided
    if (!this.newClass.name || !this.newClass.subject) {
      // Handle error or display message
      return;
    }


    // Close the modal and pass the new class data back to the parent component
    this.modalController.dismiss(this.newClass);
  }
}
