import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { DairyDetailPage } from '../dairy-detail/dairy-detail.page';

@Component({
  selector: 'app-dairy',
  templateUrl: 'dairy.page.html',
  styleUrls: ['dairy.page.scss'],
})
export class DairyPage {
  notes: any[] = [];

  constructor(
    private modalController: ModalController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.loadNotes();
  }

  async loadNotes() {
    const loggedInUser = await this.storage.get('logged-in-user');
    if (loggedInUser && loggedInUser.email) { // Check if email exists
      const userNotes = await this.storage.get(`user-${loggedInUser.email}-notes`); // Use email as identifier
      this.notes = userNotes || [];
    }
  }

  async openNoteDetail(note: any) {
    const modal = await this.modalController.create({
      component: DairyDetailPage,
      componentProps: {
        note: note
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data && data.data.deletedNote) {
        const deletedNote = data.data.deletedNote;
        this.deleteNote(deletedNote);
      }
      this.saveNotes();
    });

    return await modal.present();
  }

  addNote() {
    const newNote = {
      title: "Нова нотатка",
      description: "",
      date: new Date().toISOString().slice(0, 10),
      images: []
    };
    this.notes.push(newNote);
    this.saveNotes();
  }

  deleteNote(deletedNote: any) {
    this.notes = this.notes.filter(note => note !== deletedNote);
    this.saveNotes();
  }

  async saveNotes() {
    const loggedInUser = await this.storage.get('logged-in-user');
    if (loggedInUser && loggedInUser.email) { // Check if email exists
      await this.storage.set(`user-${loggedInUser.email}-notes`, this.notes); // Use email as identifier
    }
  }
}
