import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {ModalController} from "@ionic/angular";
import {Class} from "../models/class.model";
import {AddHomeworkModalPage} from "../add-homework-modal/add-homework-modal.page";
import {Homework} from "../models/homework";

@Component({
  selector: 'app-class-homework',
  templateUrl: './class-homework.page.html',
  styleUrls: ['./class-homework.page.scss'],
})
export class ClassHomeworkPage implements OnInit {
  classDetails: Class | undefined;
  className: string = "";
  constructor(private route: ActivatedRoute,
              private router: Router,
              private storage: Storage,
              private modalController: ModalController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.className = decodeURIComponent(<string>params.get('name'));
    });
    this.loadClassDetails()
  }

  async loadClassDetails() {
    const storedClasses: Class[] | null = await this.storage.get('classes');


    if (storedClasses && this.className) {
      this.classDetails = storedClasses.find(cls => cls.name === this.className);
    }
  }

  async openNoteDetail(homework: any) {
    const modal = await this.modalController.create({
      component: AddHomeworkModalPage,
      componentProps: {
        homework: homework
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data && data.data.deleted) {
        const deleted = data.data.deleted;
        this.deleteNote(deleted);
      }
      this.saveHomeworks()
    });

    return await modal.present();
  }

  formatDeadline(deadline: Date | null): string {
    if (deadline){
    const date = deadline;
    const year = date.getFullYear();
    const month = this.padZeroes(date.getMonth() + 1);
    const day = this.padZeroes(date.getDate());
    return `${year}.${month}.${day}`;
    }
    else return "Не визначено"
  }

  // Helper method to pad zeroes
  private padZeroes(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
  addNote() {
    const newNote: Homework = {
      title: "Нове завдання",
      description: "Опис",
      publishDate: new Date().toISOString().slice(0, 10),
      deadline:  new Date()
    };
    if (this.classDetails){
      if (this.classDetails.homeworks) {this.classDetails.homeworks.push(newNote);}
      else this.classDetails.homeworks=[]}
    this.saveHomeworks();

  }

  async saveHomeworks() {

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

  private deleteNote(deleted: Homework) {
    if (this.classDetails)
      this.classDetails.homeworks = this.classDetails.homeworks.filter(homework => homework !== deleted);
    this.saveHomeworks();
  }
}
