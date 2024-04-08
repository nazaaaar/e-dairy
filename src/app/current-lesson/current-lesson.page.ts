import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Day} from "../schedule-editor/day";
import {Lesson} from "../schedule-editor/lesson";
import { interval, Subscription } from 'rxjs';
import {Time} from "../schedule-editor/time";


@Component({
  selector: 'app-current-lesson',
  templateUrl: './current-lesson.page.html',
  styleUrls: ['./current-lesson.page.scss'],
})
export class CurrentLessonPage implements OnInit {
  lastLessonAndDay: { day: Day, lesson: Lesson, role: string } | null = null;
  private intervalSubscription!: Subscription;
  now: Date = new Date();
  constructor(private storage: Storage) { }

  async ngOnInit() {
    await this.updateNextLesson();

    this.intervalSubscription = interval(9000).subscribe(() => {
      this.updateNextLesson();
    });
  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  async updateNextLesson() {
    const orderedDaysKeys = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота'];

    // Populate days with lessons
    const days = await Promise.all(
      orderedDaysKeys.map(async (dayName) => {
        const savedData = await this.storage.get(dayName.toLowerCase());
        const lessons: Lesson[] = savedData ? savedData.lessons : [];
        return new Day(dayName, lessons);
      })
    );

    // Get the last lesson and its corresponding day
    this.lastLessonAndDay = this.getNextLesson(days);
  }

  // Function to find the last lesson and its corresponding day among all days
  getNextLesson(days: Day[]): { day: Day, lesson: Lesson, role: string } | null {
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

        if (timeDiff > 0){
          if(timeDiff < closestLessonTimeDiff) {
          closestLessonTimeDiff = timeDiff;
          closestLesson = lesson;
          closestDay = day;
          break; // Exit the loop once a closer lesson is found
        }}
        else if (-timeDiff<lesson.endTime){
          return { day: day, lesson: lesson, role: "current" };
        }

      }

      if (closestLesson && closestDay) {
        return { day: closestDay, lesson: closestLesson, role: "next" };
      }

    for (let i = currentDayIndex+1; i < currentDayIndex + 8; i++) {

      const dayIndex = i % 7; // Wrap around to handle days beyond Sunday
      const day = days[dayIndex];



      if (day.lessons[0]){
        closestLesson = day.lessons[0];
        closestDay = day;
        return { day: closestDay, lesson: closestLesson, role: "next" };
      }

    }

    return null; // No future lessons scheduled
  }

  protected readonly Lesson = Lesson;
  protected readonly Time = Time;
}
