import {Component, Input, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {ClassLesson} from "../models/classLesson.model";


@Component({
  selector: 'app-add-lesson-modal',
  templateUrl: './add-lesson-modal.page.html',
  styleUrls: ['./add-lesson-modal.page.scss'],
})
export class AddLessonModalPage implements OnInit {
  @Input() lesson: ClassLesson = { id: 0, title: '', info: '', usersCompleted: [] };

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  async dismiss() {
    await this.modalController.dismiss();
  }

  async saveLesson() {
    // You can perform validation here before saving the lesson
    await this.modalController.dismiss(this.lesson);
  }

  async deleteLesson() {
    // You can perform validation here before saving the lesson
    await this.modalController.dismiss('delete');
  }
}
