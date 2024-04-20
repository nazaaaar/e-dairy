import { Component, OnInit } from '@angular/core';
import {Class} from "../models/class.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {ModalController} from "@ionic/angular";
import {AddHomeworkModalPage} from "../add-homework-modal/add-homework-modal.page";
import {Homework} from "../models/homework";

@Component({
  selector: 'app-student-homework',
  templateUrl: './student-homework.page.html',
  styleUrls: ['./student-homework.page.scss'],
})
export class StudentHomeworkPage implements OnInit {
  classDetails: Class | undefined;
  className: string = "";
  constructor(private route: ActivatedRoute,
              private router: Router,
              private storage: Storage,
              private modalController: ModalController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.className = decodeURIComponent(params.get('className') || '');
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
        homework: homework,
        editMode: false
      }
    });

    modal.onDidDismiss().then((data) => {
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
}
