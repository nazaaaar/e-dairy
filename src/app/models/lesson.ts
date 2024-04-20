import {Time} from "../schedule-editor/time";

export class Lesson {


  subject: string;
  startTime: number;
  endTime: number;
  link?: string;
  description?: string;


  constructor(subject: string, startTime: number, endTime: number, link?: string, description?: string, ) {
    this.subject = subject;
    this.startTime = startTime;
    this.endTime = endTime;
    this.link = link;
    this.description = description;
  }

  static prettyTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const sign = minutes >= 0 ? '' : '-';

    return `${sign}${Math.abs(hours)}:${Math.abs(remainingMinutes).toString().padStart(2, '0')}`;
  }
}
