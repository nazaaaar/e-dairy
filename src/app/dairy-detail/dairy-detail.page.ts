import { Component, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import {MaskitoOptions, MaskitoElementPredicate, Maskito} from '@maskito/core';

@Component({
  selector: 'app-note-detail',
  templateUrl: 'dairy-detail.page.html',
  styleUrls: ['dairy-detail.page.scss'],
})
export class DairyDetailPage {

  @Input() note: any;
  editMode: boolean = false;


  constructor(private modalController: ModalController) {

  }

  readonly dateMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
  };

  closeModal() {
    this.modalController.dismiss();
  }


  editDate() {
    this.editMode = true;
  }

  deleteNote() {
    this.modalController.dismiss({
      deletedNote: this.note // Send the ID of the deleted note back to the DairyPage
    });
  }

  confirm() {
    // Perform any additional logic here if needed
    this.editMode = false; // Set editMode to false
  }

  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();
}
