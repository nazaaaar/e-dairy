import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ModalController } from "@ionic/angular";
import { Class } from "../models/class.model";
import {ClassLesson} from "../models/classLesson.model";

import {AddLessonModalPage} from "../add-lesson-modal/add-lesson-modal.page";

@Component({
  selector: 'app-class-lessons',
  templateUrl: './class-lessons.page.html',
  styleUrls: ['./class-lessons.page.scss'],
})
export class ClassLessonsPage implements OnInit {
  className: string | null = null;
  classDetails: Class | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.className = decodeURIComponent(params.get('name') || '');
      this.loadClassDetails();
    });
  }

  async loadClassDetails() {
    const storedClasses: Class[] | null = await this.storage.get('classes');

    if (storedClasses && this.className) {
      this.classDetails = storedClasses.find(cls => cls.name === this.className);
      if (this.classDetails){
        if (this.classDetails.lessons==null) this.classDetails.lessons=[];
        this.sortClassLessonsById();
      }
    }
  }

  sortClassLessonsById() {
    this.classDetails?.lessons.sort((a, b) => a.id - b.id);
  }

  async addLesson() {
    const modal = await this.modalController.create({
      component: AddLessonModalPage
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        if (data.data == 'delete'){return}
        const newLesson: ClassLesson = data.data;

        this.classDetails?.lessons.push(newLesson);
        this.save();

      }
    });

    await modal.present();
  }

  async editLesson(lesson: ClassLesson) {
    const modal = await this.modalController.create({
      component: AddLessonModalPage,
      componentProps: {
        lesson: lesson // Pass the lesson to the modal
      }
    });

    modal.onDidDismiss().then((data) => {
      if ( data.data) {
        const editedLesson: ClassLesson = data.data;

        // Find the lesson to be edited by its object
        const lessonToEdit = this.classDetails?.lessons.find(l => l === lesson);

        if (lessonToEdit) {
          if (data.data == "delete") {
              if (this.classDetails)
                this.classDetails.lessons = this.classDetails.lessons.filter(lesson => lesson !== lessonToEdit)
          }
        else{

          lessonToEdit.title = editedLesson.title;
          lessonToEdit.info = editedLesson.info;
          lessonToEdit.id = editedLesson.id;



        }
          this.save();
      }
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

    this.sortClassLessonsById();
  }
}
