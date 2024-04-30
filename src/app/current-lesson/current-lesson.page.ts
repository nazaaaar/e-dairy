import {Component, OnDestroy, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Day} from "../models/day";
import {Lesson} from "../models/lesson";
import {interval, Subscription} from 'rxjs';
import {Time} from "../schedule-editor/time";

@Component({
  selector: 'app-current-lesson',
  templateUrl: './current-lesson.page.html',
  styleUrls: ['./current-lesson.page.scss'],
})
export class CurrentLessonPage implements OnInit, OnDestroy {
  lastLessonAndDay: { day: Day, lesson: Lesson, role: string } | null = null;
  private intervalSubscription!: Subscription;
  now: Date = new Date();
  days: Day[] = [];

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.initializeDays();
    this.intervalSubscription = interval(6000).subscribe(() => {
      this.updateDays();
    });

  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  async initializeDays() {
    const orderedDaysKeys = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота'];
    this.days = await this.getDaysFromStorage(orderedDaysKeys);
    this.updateLastLessonAndDay();
  }

  async updateDays() {
    const orderedDaysKeys = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота'];
    const updatedDays = await this.getDaysFromStorage(orderedDaysKeys);
    this.days.forEach((day, index) => {
      const updatedLessons = updatedDays[index].lessons;
      day.lessons = updatedLessons;
    });
    this.updateLastLessonAndDay();
  }

  private async getDaysFromStorage(orderedDaysKeys: string[]): Promise<Day[]> {
    return Promise.all(
      orderedDaysKeys.map(async (dayName) => {
        const loggedInUser = await this.storage.get('logged-in-user');
        if (loggedInUser) {
          const loggedInUserEmail = loggedInUser.email;
          const savedData = await this.storage.get(`${dayName.toLowerCase()}_${loggedInUserEmail}`);
          const lessons: Lesson[] = savedData ? savedData.lessons : [];
          return new Day(dayName, lessons);
        } else {
          return new Day(dayName, []);
        }
      })
    );
  }

  private updateLastLessonAndDay() {
    const nextLessonData = this.getNextLesson(this.days);
    if (nextLessonData) {
      this.lastLessonAndDay = nextLessonData;
    }
  }

  private getNextLesson(days: Day[]): { day: Day; lesson: Lesson; role: string } | null {
    this.now = new Date(); // Get current date and time
    const currentDayIndex = this.now.getDay(); // Get the current day index (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const currentTime = this.now.getHours() * 60 + this.now.getMinutes(); // Get the current time in minutes

    let closestLessonTimeDiff = Infinity;
    let closestLesson: Lesson | null = null;
    let closestDay: Day | null = null;

    const day = days[currentDayIndex];

    for (const lesson of day.lessons) {
      const lessonStartTime = lesson.startTime;
      const timeDiff = lessonStartTime - currentTime;

      if (timeDiff > 0) {
        if (timeDiff < closestLessonTimeDiff) {
          closestLessonTimeDiff = timeDiff;
          closestLesson = lesson;
          closestDay = day;
          break;
        }
      }
      else if (-timeDiff < lesson.endTime - lesson.startTime) {
        return { day: day, lesson: lesson, role: "current" };
      }
    }

    if (closestLesson && closestDay) {
      return { day: closestDay, lesson: closestLesson, role: "next" };
    }

    for (let i = currentDayIndex + 1; i < currentDayIndex + 8; i++) {
      const dayIndex = i % 7;
      const day = days[dayIndex];

      if (day.lessons[0]) {
        closestLesson = day.lessons[0];
        closestDay = day;
        return { day: closestDay, lesson: closestLesson, role: "next" };
      }
    }

    return null;
  }

  protected readonly Lesson = Lesson;
  protected readonly Time = Time;

  getFullHoursAmount(lastLessonAndDay:  { day: Day, lesson: Lesson, role: string }){
    if (lastLessonAndDay.role==="next"){
      let timeDiff = lastLessonAndDay.lesson.startTime-Time.hourMinutesToMinutes(this.now.getHours(),this.now.getMinutes())
      let daysUntilNextLesson = lastLessonAndDay.day.id - this.now.getDay();
      if (daysUntilNextLesson < 0) {
        daysUntilNextLesson += 7;
      }
      if(timeDiff<0 && daysUntilNextLesson==0){daysUntilNextLesson+=7}

      let totalMinutes=0;
      if (daysUntilNextLesson>0){
        totalMinutes+=this.minutesUntilNextDay()+(daysUntilNextLesson-1)*24*60+lastLessonAndDay.lesson.startTime
      }
      else totalMinutes+= lastLessonAndDay.lesson.startTime-Time.hourMinutesToMinutes(this.now.getHours(),this.now.getMinutes())
      return totalMinutes;
    }
  return reportError("role isnt next");

  }

    minutesUntilNextDay() {
    // Get the current date and time
    const now = new Date();

    // Get the current hour and minute
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Calculate the time remaining until the end of the current day
    const hoursRemaining = 23 - currentHour; // Hours remaining in the current day
    const minutesRemaining = 59 - currentMinute; // Minutes remaining in the current hour

    // Calculate the total hours remaining until the next day
      return hoursRemaining*60 + minutesRemaining;
  }

  getHoursAndDays(lastLessonAndDay:  { day: Day, lesson: Lesson, role: string }): {hours: number, minutes: number, days: number} | null{
    let fullMinutesAmount = this.getFullHoursAmount(lastLessonAndDay);
    if (fullMinutesAmount){
      let fulldays = this.extractFullDaysFromMinutes(fullMinutesAmount)
      let time = Time.minutesToHourMinutes(fullMinutesAmount - fulldays * 60 * 24);
      return {hours: time.hours, minutes: time.minutes, days: fulldays};
    }
    else return null;
  }

  extractFullDaysFromMinutes(totalMinutes: number): number {
    const minutesInADay = 24 * 60; // 24 hours * 60 minutes
    const fullDays = Math.floor(totalMinutes / minutesInADay);
    return fullDays;
  }
  prettyDay(daysAmount: number): string {
    if (daysAmount === 1) {
      return 'день';
    } else if (daysAmount > 1 && daysAmount < 5) {
      return 'дні';
    } else {
      return 'днів';
    }
  }

  prettyTime(lastLessonAndDay:  { day: Day, lesson: Lesson, role: string }){
    let hoursAndDays = this.getHoursAndDays(lastLessonAndDay);
    if (hoursAndDays) {
      let daysString = hoursAndDays.days + " " + this.prettyDay(hoursAndDays.days);
      let hoursString = this.prettyFormatTimeUnit(hoursAndDays.hours, 'година', 'години', 'годин');
      let minutesString = this.prettyFormatTimeUnit(hoursAndDays.minutes, 'хвилина', 'хвилини', 'хвилин');

      return `${daysString} ${hoursString} ${minutesString}`;
    }
    return '';
  }

  prettyFormatTimeUnit(amount: number, singular: string, few: string, plural: string): string {
    if (amount === 1) {
      return `${amount} ${singular}`;
    } else if (amount > 1 && amount < 5) {
      return `${amount} ${few}`;
    } else {
      return `${amount} ${plural}`;
    }
  }


}
