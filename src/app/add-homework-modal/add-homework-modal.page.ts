import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { MaskitoElementPredicate, MaskitoOptions } from "@maskito/core";

@Component({
  selector: 'app-add-homework-modal',
  templateUrl: './add-homework-modal.page.html',
  styleUrls: ['./add-homework-modal.page.scss'],
})
export class AddHomeworkModalPage implements OnInit {
  @Input() homework: any;
  @Input() editMode: boolean = true;


  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    if (this.homework && this.homework.deadline) {
      // Convert deadline to string format if it exists
      this.deadlineString = this.convertToString(this.homework.deadline);
    }
  }

  readonly dateMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
  };

  closeModal() {
    const deadlineValid = this.validateDeadline(this.deadlineString);
    if (deadlineValid) {
      this.homework.deadline = this.convertToDate(this.deadlineString);
      this.modalController.dismiss();
    } else {
      // Handle invalid deadline
      console.error('Invalid deadline format');
    }
  }

  deleteNote() {
    this.modalController.dismiss({
      deleted: this.homework // Send the ID of the deleted note back to the DairyPage
    });
  }

  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  deadlineString!: string; // Change the type to string

  private validateDeadline(deadline: string): boolean {
    // Implement your validation logic here
    // For example, you can use regex to check the format
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(deadline);
  }

  private convertToDate(deadline: string): Date {
    // Split the string and construct a Date object
    const parts = deadline.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Months are 0-indexed in JavaScript
    const day = parseInt(parts[2]);
    return new Date(year, month, day);
  }

  private convertToString(date: Date): string {
    // Convert date to string format
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add padding if necessary
    const day = date.getDate().toString().padStart(2, '0'); // Add padding if necessary
    return `${year}-${month}-${day}`;
  }
}
