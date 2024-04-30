import { Component, OnInit } from '@angular/core';
import { Day } from '../models/day';
import { Lesson } from '../models/lesson';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddCardComponent } from '../add-card/add-card.component';
import { Storage } from '@ionic/storage-angular';
import { Time } from "./time";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-schedule-editor',
  templateUrl: './schedule-editor.page.html',
  styleUrls: ['./schedule-editor.page.scss'],
})
export class ScheduleEditorPage implements OnInit {
  days: Day[] = [];
  dayStyles: { [key: string]: { icon: string, color: string } } = {
    'Понеділок': { icon: 'calendar-outline', color: '#FFD700' }, // Yellow color for Monday
    'Вівторок': { icon: 'calendar-outline', color: '#32db64' }, // Green color for Tuesday
    'Середа': { icon: 'calendar-outline', color: '#ffce00' }, // Yellow color for Wednesday
    'Четвер': { icon: 'calendar-outline', color: '#ff6900' }, // Orange color for Thursday
    "П'ятниця": { icon: 'calendar-outline', color: '#a052e0' }, // Purple color for Friday
    'Субота': { icon: 'calendar-outline', color: '#34e7e4' }, // Cyan color for Saturday
    'Неділя': { icon: 'calendar-outline', color: '#9a89ea' } // Lavender color for Sunday
  };


  constructor(private modalCtrl: ModalController,
              private storage: Storage,
              private actionSheetCtrl: ActionSheetController,
              protected appComponent: AppComponent) {}

  async ngOnInit() {
    const loggedInUser = await this.storage.get('logged-in-user');

    if (loggedInUser) {
      const loggedInUserEmail = loggedInUser.email;

      const orderedDaysKeys = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота', 'Неділя'];

      // Populate days with lessons
      this.days = await Promise.all(
        orderedDaysKeys.map(async (dayName) => {
          const savedData = await this.storage.get(`${dayName.toLowerCase()}_${loggedInUserEmail}`);
          const lessons: Lesson[] = savedData ? savedData.lessons : [];
          return new Day(dayName, lessons);
        })
      );
    }
  }

  toggleExpansion(day: Day) {
    day.expanded = !day.expanded;
  }

  async openAddModal(day: Day) {
    const { data, role } = await this.openModal();

    if (role == 'confirm' && data) {
      day.addLesson(new Lesson(data.subject, data.startMinutes, data.endMinutes, data.link, data.description));

      const loggedInUser = await this.storage.get('logged-in-user');
      if (loggedInUser) {
        const loggedInUserEmail = loggedInUser.email;
        await this.storage.set(`${day.name.toLowerCase()}_${loggedInUserEmail}`, { lessons: day.lessons });
      }
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
      const loggedInUser = await this.storage.get('logged-in-user');
      if (loggedInUser) {
        const loggedInUserEmail = loggedInUser.email;
        await this.storage.set(`${day.name.toLowerCase()}_${loggedInUserEmail}`, { lessons: day.lessons });
      }
    }
  }

  private async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddCardComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    return { data, role };
  }

  async deleteLesson(day: Day, lesson: Lesson) {
    day.deleteLessonByObject(lesson);
    const loggedInUser = await this.storage.get('logged-in-user');
    if (loggedInUser) {
      const loggedInUserEmail = loggedInUser.email;
      await this.storage.set(`${day.name.toLowerCase()}_${loggedInUserEmail}`, { lessons: day.lessons });
    }
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
