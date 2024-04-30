import { Component, OnInit } from '@angular/core';
import {Class} from "../models/class.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {ModalController} from "@ionic/angular";
import {AddLessonModalPage} from "../add-lesson-modal/add-lesson-modal.page";
import {ClassLesson} from "../models/classLesson.model";
import {StudentLessonDetailsPage} from "../student-lesson-details/student-lesson-details.page";
import {User} from "../models/user.interface";

@Component({
  selector: 'app-student-lessons',
  templateUrl: './student-lessons.page.html',
  styleUrls: ['./student-lessons.page.scss'],
})
export class StudentLessonsPage implements OnInit {
  className: string | null = null;
  classDetails: Class | undefined;

  userReads: Map<ClassLesson, boolean> = new Map<ClassLesson, boolean>();
  private loggedInUser!: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.className = decodeURIComponent(params.get('className') || '');
    });
    this.loadClassDetails();
  }

  async loadClassDetails() {
    const storedClasses: Class[] | null = await this.storage.get('classes');
    this.loggedInUser = await this.storage.get('logged-in-user');

    if (storedClasses && this.className && this.loggedInUser) {
      this.classDetails = storedClasses.find(cls => cls.name === this.className);
      if (this.classDetails){
        if (this.classDetails.lessons==null) this.classDetails.lessons=[];
        this.sortClassLessonsById();
      }

      this.classDetails?.lessons.forEach(
        (lesson: ClassLesson) =>
          this.userReads
            .set(lesson, lesson.usersCompleted.some(s => s == this.loggedInUser.email)));
    }
  }

  sortClassLessonsById() {
    this.classDetails?.lessons.sort((a, b) => a.id - b.id);
  }

  async openLesson(lesson: ClassLesson) {
    const modal = await this.modalController.create({
      component: StudentLessonDetailsPage,
      componentProps: {
        lesson: lesson,
        isRead: this.userReads.get(lesson)
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        if (data.data.isRead){
          this.userReads.set(lesson,true )
          lesson.usersCompleted.push(this.loggedInUser.email)
        }
        else{
          this.userReads.set(lesson,false )
          lesson.usersCompleted = lesson.usersCompleted.filter((a: string) => a != this.loggedInUser.email)
        }

        this.save()
      }
    });

    await modal.present();
  }
  async save() {

    const storedClasses: Class[] | null = await this.storage.get('classes');
    if (storedClasses) {
      const updatedClasses = storedClasses.map(cls => {
        if (cls.name === this.className) {
          if (this.classDetails)
            return this.classDetails;
        }
        return cls;
      });
      await this.storage.set('classes', updatedClasses)
    }
  }
}
