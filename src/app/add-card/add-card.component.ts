import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Time} from "../schedule-editor/time";

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent  implements OnInit {

  @Input() lessonData: any;
  subject: string = '';

  duration!: any;
  description!: string;
  link!: string;
  hours: any;
  minutes: any;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {

    let startMinutes = Time.hourMinutesToMinutes(this.hours,this.minutes);
    return this.modalCtrl.dismiss({
        subject: this.subject,
        startMinutes: startMinutes,
        endMinutes: startMinutes+this.duration,
        description: this.description,
        link: this.link
      },
      'confirm');
  }

  ngOnInit() {
    if (this.lessonData) {
      this.subject = this.lessonData.subject;
      this.duration = this.lessonData.duration;
      this.description = this.lessonData.description;
      this.link = this.lessonData.link;
      this.hours = this.lessonData.hours;
      this.minutes = this.lessonData.minutes;
    }
  }

  isFormValid() {
    return this.subject.trim() !== '' &&
      this.duration >= 1 &&
      this.hours >= 0 && this.hours <= 23 &&
      this.minutes >= 0 && this.minutes <= 59;
  }
}
