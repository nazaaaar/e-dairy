import {Time} from "./time";

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

  static prettyTime(time:number):string{
    const mh = Time.minutesToHourMinutes(time);
    const hoursStr = mh.hours < 10 ? '0' + mh.hours : mh.hours;
    const minutesStr = mh.minutes < 10 ? '0' + mh.minutes : mh.minutes;
    return hoursStr + ":" + minutesStr;
  }
}
