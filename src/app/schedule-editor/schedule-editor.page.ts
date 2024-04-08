import { Component, OnInit } from '@angular/core';
import { Day } from './day';
import { Lesson } from './lesson';
import {ActionSheetController, ModalController} from '@ionic/angular';
import { AddCardComponent } from '../add-card/add-card.component';
import { Storage } from '@ionic/storage-angular';
import {Time} from "./time";

@Component({
  selector: 'app-schedule-editor',
  templateUrl: './schedule-editor.page.html',
  styleUrls: ['./schedule-editor.page.scss'],
})
export class ScheduleEditorPage implements OnInit {
  days: Day[] = [];

  constructor(private modalCtrl: ModalController, private storage: Storage, private actionSheetCtrl: ActionSheetController) {}

  async ngOnInit() {
    const orderedDaysKeys = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота', 'Неділя'];

    // Populate days with lessons
    this.days = await Promise.all(
      orderedDaysKeys.map(async (dayName) => {
        const savedData = await this.storage.get(dayName.toLowerCase());
        const lessons: Lesson[] = savedData ? savedData.lessons : [];
        return new Day(dayName, lessons);
      })
    );
  }

  toggleExpansion(day: Day) {
    day.expanded = !day.expanded;
  }

  async openAddModal(day: Day) {
    const {data, role} = await this.openModal();

    if (role == 'confirm' && data) {
      // Add new lesson to the existing lessons array
      day.addLesson(new Lesson(data.subject, data.startMinutes, data.endMinutes, data.link, data.description));
      // Save updated lessons array
      await this.storage.set(day.name.toLowerCase(), { lessons: day.lessons });
    }
  }
  async openEditModal(day: Day, lesson: Lesson) {
    const mh = Time.minutesToHourMinutes(lesson.startTime);
    const modal = await this.modalCtrl.create({
      component: AddCardComponent,
      componentProps: {
        lessonData: {
          subject: lesson.subject,
          duration: lesson.endTime - lesson.startTime,
          description: lesson.description,
          link: lesson.link,
          hours: mh.hours,
          minutes: mh.minutes
        }
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role == 'confirm' && data) {
      day.editLesson(lesson, new Lesson(data.subject, data.startMinutes, data.endMinutes, data.link, data.description));
      await this.storage.set(day.name.toLowerCase(), { lessons: day.lessons });
    }
  }

  private async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddCardComponent,
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();
    return {data, role};
  }

  async deleteLesson(day: Day, lesson: Lesson){
    day.deleteLessonByObject(lesson);
    await this.storage.set(day.name.toLowerCase(), { lessons: day.lessons });
  }

  async presentActionSheet(day: Day, lesson: Lesson) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: lesson.subject,
      subHeader: day.name,
      buttons: [
        {
          text: 'Змінити',
          handler: () => {
            this.openEditModal(day, lesson);
          }
        },
        {
          text: 'Видалити',
          role: 'destructive',
          handler: () => {
            this.confirmAction(() => this.deleteLesson(day, lesson));
          }
        },
        {
          text: 'Відмінити',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  async confirmAction(callback: () => void) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Ви впевнені?",
      buttons: [
        {
          text: 'Підтвердити',
          role: 'confirm',
          handler: callback
        },
        {
          text: 'Відмінити',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  protected readonly Time = Time;
  protected readonly Lesson = Lesson;
}
