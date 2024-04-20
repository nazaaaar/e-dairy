import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {AlertController, ToastController} from '@ionic/angular';
import { Class } from '../models/class.model';
import { User } from "../models/user.interface";
import { Mark } from '../models/mark';

@Component({
  selector: 'app-add-mark',
  templateUrl: './add-mark.page.html',
  styleUrls: ['./add-mark.page.scss'],
})
export class AddMarkPage implements OnInit {
  mark!: number;
  description!: string;
  student!: User;
  classDetails!: Class;
  filteredMarks: Mark[] = [];
  selectedMonth: number | null = null;
  showPreviousMarks: boolean = true; // Flag to toggle display of previous marks
   studentId!: string;
   className!: string;

  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.studentId = decodeURIComponent(params.get('studentId') || '');
      this.className = decodeURIComponent(params.get('className') || '');
    });

    // Retrieve stored users
    const storedUsers: { [email: string]: User } = await this.storage.get('userData') || {};

    // Find the student by email
    const a = Object.values(storedUsers).find(user => user.email === this.studentId);
    if (a) this.student = a;

    if (!this.student) {
      console.log('Student not found in storage.');
      return;
    }

    const storedClasses: Class[] = await this.storage.get('classes') || [];

    // Find the class by name
    const b =storedClasses.find(cls => cls.name === this.className);
    if (b) this.classDetails=b;

    if (!this.classDetails) {
      console.log('Class not found in storage.');
      return;
    }
    // Load previous marks
    this.loadPreviousMarks();
  }


  togglePreviousMarks() {
    this.showPreviousMarks = !this.showPreviousMarks;
  }

  loadPreviousMarks() {
    if (this.classDetails && this.classDetails.marks && this.classDetails.marks[this.student.email]) {
      this.filteredMarks = this.classDetails.marks[this.student.email];
      // Sort marks by date in descending order
      this.filteredMarks.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
  }

  filterMarksByMonth(month: number | null) {
    this.selectedMonth = month;
    if (month === null) {
      // If no month selected, show all marks
      this.loadPreviousMarks();
    } else {
      // Filter marks by selected month
      if (this.classDetails.marks) {
        this.filteredMarks = this.classDetails.marks[this.student.email].filter(mark => mark.date.getMonth() === month);
      }
      // Sort marks by date in descending order
      this.filteredMarks.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
  }

  async saveMark() {
    if (!this.classDetails.marks) {
      this.classDetails.marks = {};
    }
    if (!this.classDetails.marks[this.student.email]) {
      this.classDetails.marks[this.student.email] = [];
    }
    const newMark: Mark = {
      date: new Date(),
      mark: this.mark,
      description: this.description,
      showDescription: false
    };
    this.classDetails.marks[this.student.email].push(newMark);

    // Update classDetails in storage
    const storedClasses: Class[] | null = await this.storage.get('classes');
    if (storedClasses) {
      const updatedClasses = storedClasses.map(cls => {
        if (cls.name === this.classDetails.name) {
          // Update the classDetails with the new mark
          cls = this.classDetails;
        }
        return cls;
      });
      await this.storage.set('classes', updatedClasses);
    }

    // Display a toast indicating successful mark addition
    this.presentToast('Mark added successfully');
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
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
  async deleteMark(mark: Mark) {
    // Check if classDetails and marks are defined
    if (this.classDetails && this.classDetails.marks && this.classDetails.marks[this.student.email]) {
      const [alert] = await Promise.all([this.alertController.create({
        header: 'Підтвердити видалення',
        message: 'Ви впевнені що хочете видалити цю оцінку?',
        buttons: [
          {
            text: 'Відмінити',
            role: 'cancel'
          },
          {
            text: 'Видалити',
            handler: async () => {
              this.filteredMarks = this.filteredMarks.filter(m => m !== mark);

              const marksArray = this.classDetails.marks[this.student.email];
              if (marksArray) {
                const markIndex = marksArray.findIndex(m => m === mark);
                if (markIndex !== -1) {
                  marksArray.splice(markIndex, 1);

                  // Update classDetails in storage
                  const storedClasses: Class[] | null = await this.storage.get('classes');
                  if (storedClasses) {
                    const updatedClasses = storedClasses.map(cls => {
                      if (cls.name === this.classDetails.name) {
                        return this.classDetails;
                      }
                      return cls;
                    });
                    await this.storage.set('classes', updatedClasses);
                  }
                  this.presentToast('Mark deleted successfully');
                }
              } else {
                console.log('Marks array is undefined.');
              }
            }
          }
        ]
      })]);
      await alert.present();
    } else {
      console.log('Class details or marks are undefined.');
    }
  }

  toggleDescription(mark: Mark) {
    mark.showDescription = !mark.showDescription;
  }

  goBack() {
    this.router.navigate(['/class-tabs/class-students', encodeURIComponent(this.className)])
  }
}
