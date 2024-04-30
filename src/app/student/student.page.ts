import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { Class } from "../models/class.model";
import { Homework } from "../models/homework";
import {AlertController, ModalController} from "@ionic/angular";
import {ClassSearchModalPage} from "../class-search-modal/class-search-modal.page";

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  allClasses: any;
  colorMap: Map<string, string> = new Map(); // Modify the type of Map

  constructor(private router: Router,
              private storage: Storage ,
              private modalController: ModalController,
              private alertController: AlertController) { }

  viewClassStudents(selectedClass: Class) {
    const encodedName = encodeURIComponent(selectedClass.name);
    localStorage.setItem('class-name-encoded', encodedName);
    this.router.navigate(['/student-tabs/my-marks', {
      className: encodedName
    }]);
  }

  private fullClasses = this.storage.get('classes');

  async loadClasses() {
    const loggedInUser = await this.storage.get('logged-in-user');

    if (loggedInUser) {
      const loggedInUserEmail = loggedInUser.email;

      const storedClasses = await this.fullClasses;

      if (storedClasses) {
        this.allClasses = storedClasses.filter((cls: Class) => cls.students.some(student => student.email === loggedInUserEmail));

        // Populate colorMap with colors for each class
        this.allClasses.forEach((cls: Class) => {
          this.colorMap.set(cls.name, this.getNextColor());
        });
      }
    }
  }

  ngOnInit() {
    this.loadClasses();
  }

  colorIndex: number = 0;
  getNextColor(): string {
    const colors = ['#FF5733', '#ffdd33', '#ff9933', '#ff337a']; // Array of colors
    const color = colors[this.colorIndex];
    this.colorIndex = (this.colorIndex + 1) % colors.length; // Increment color index and wrap around if needed
    return color;
  }

  getColor(className: string): string {
    return this.colorMap.get(className) || ''; // Return color from the color map
  }

  async openClassSearch() {
    this.presentModal(await this.fullClasses);
  }

  async presentModal(classes: Class[]) {
    const modal = await this.modalController.create({
      component: ClassSearchModalPage,
      componentProps: {
        classes: classes
      }
    });

    modal.onDidDismiss().then(async (data) => {
      if (data && data.data) {
        this.fullClasses = data.data; // Update fullClasses with the modified classes
        await this.storage.set('classes', this.fullClasses); // Update the storage
        await this.loadClasses(); // Reload allClasses
      }
    });

    return await modal.present();
  }

  // Method to leave a class
  async leaveClass(cls: Class) {
    const loggedInUser = await this.storage.get('logged-in-user');

    if (loggedInUser) {
      const loggedInUserEmail = loggedInUser.email;

      // Show confirmation alert before leaving the class
      const alert = await this.alertController.create({
        header: 'Підтвердження',
        message: 'Ви впевнені що хочете покинути цей курс?',
        buttons: [
          {
            text: 'Відміна',
            role: 'cancel',
            handler: () => {
              this.router.navigateByUrl('/student', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/student']);
              });
            }
          },
          {
            text: 'Покинути',
            handler: async () => {
              // Remove the current user from the class's students list
              cls.students = cls.students.filter(student => student.email !== loggedInUserEmail);

              // Update the class in storage
              const updatedClasses = this.fullClasses.then((data) => data.map((c:any) => c.name === cls.name ? cls : c));
              await this.storage.set('classes', updatedClasses);

              // Reload the classes
              await this.loadClasses();

              // Redirect to the current page (refresh)
              this.router.navigateByUrl('/student', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/student']);
              });
            }
          }
        ]
      });
      await alert.present();
    }
  }
}
