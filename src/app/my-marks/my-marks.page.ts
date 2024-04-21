import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.interface";
import {Class} from "../models/class.model";
import {Mark} from "../models/mark";
import {ActivatedRoute, Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {AlertController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-my-marks',
  templateUrl: './my-marks.page.html',
  styleUrls: ['./my-marks.page.scss'],
})
export class MyMarksPage implements OnInit {
  student!: User;
  classDetails!: Class;
  filteredMarks: Mark[] = [];
  selectedMonth: number | null = null;
  className!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.className = decodeURIComponent(params.get('className') || '');
    });
    await this.loadClass();
  }

  public async loadClass() {
    this.student = await this.storage.get('logged-in-user')

    const storedClasses: Class[] = await this.storage.get('classes') || [];

    const b = storedClasses.find(cls => cls.name === this.className);
    if (b) this.classDetails = b;

    if (!this.classDetails) {
      console.log('Class not found in storage.');
      return;
    }
    this.loadPreviousMarks();
  }

  loadPreviousMarks() {
    if (this.classDetails && this.classDetails.marks && this.classDetails.marks[this.student.email]) {
      this.filteredMarks = this.classDetails.marks[this.student.email];
      this.filteredMarks.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
  }

  filterMarksByMonth(month: number | null) {
    this.selectedMonth = month;
    if (month === null) {
      this.loadPreviousMarks();
    } else {
      if (this.classDetails.marks[this.student.email]) {
        this.filteredMarks = this.classDetails.marks[this.student.email].filter(mark => mark.date.getMonth() === month);
      }
      this.filteredMarks.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
  }

  months = [
    { label: 'Всі', value: null },
    { label: 'Січень', value: 1 },
    { label: 'Лютий', value: 2 },
    { label: 'Квітень', value: 3 },
    { label: 'Березень', value: 4 },
    { label: 'Травень', value: 5 },
    { label: 'Червень', value: 6 },
    { label: 'Липень', value: 7 },
    { label: 'Серпень', value: 8 },
    { label: 'Вересень', value: 9 },
    { label: 'Жовтень', value: 10 },
    { label: 'Листопад', value: 11 },
    { label: 'Грудень', value: 12 },
  ];
  toggleDescription(mark: Mark) {
    mark.showDescription = !mark.showDescription;
  }

}
