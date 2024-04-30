import {Component, Input, OnInit} from '@angular/core';
import {ClassLesson} from "../models/classLesson.model";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-student-lesson-details',
  templateUrl: './student-lesson-details.page.html',
  styleUrls: ['./student-lesson-details.page.scss'],
})
export class StudentLessonDetailsPage implements OnInit {
  @Input() lesson: ClassLesson = { id: 0, title: '', info: '', usersCompleted: [] };
  @Input() isRead!: boolean | undefined;

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  async dismiss() {
    await this.modalController.dismiss();
  }

  async saveLesson() {
    await this.modalController.dismiss({isRead: !this.isRead});
  }

}
