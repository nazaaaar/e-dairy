import {User} from "./user.interface";
import {Mark} from "./mark";
import {Homework} from "./homework";
import {ClassLesson} from "./classLesson.model";

export class Class {
  name: string = '';
  subject: string = '';
  teacherEmail: string = ''; // Assuming teacher is identified by email
  students: User[] = [];
  marks: { [email: string]: Mark[] } = {};
  homeworks: Homework[] = [];
  lessons: ClassLesson[] = [];
}

