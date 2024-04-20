import {Lesson} from "./lesson";


export class Day {
  static maxId=0;
  id: number;
  name: string;
  expanded: boolean;
  lessons: Lesson[];


  constructor(name: string, lessons: Lesson[]) {
    this.id=Day.maxId++ % 7;
    this.name = name;
    this.expanded=false;
    this.lessons = lessons;
  }

  addLesson(lesson: Lesson) {
    this.lessons.push(lesson);
    this.lessons.sort((a, b) => a.startTime - b.startTime);
  }

  editLesson(existingLesson: Lesson, newLesson: Lesson) {
    const index = this.lessons.findIndex(lesson => lesson === existingLesson);
    if (index !== -1) {
      this.lessons[index] = newLesson;
    } else {
      console.error('Lesson not found.');
    }
    this.lessons.sort((a, b) => a.startTime - b.startTime);
  }

  deleteLessonByObject(lessonToDelete: Lesson) {
    const index = this.lessons.findIndex(lesson => lesson === lessonToDelete);
    if (index !== -1) {
      this.lessons.splice(index, 1);
    } else {
      console.error('Lesson not found.');
    }
    this.lessons.sort((a, b) => a.startTime - b.startTime);
  }
}
