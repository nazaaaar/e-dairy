import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor() { }

  ngOnInit() {
    const arrows = document.querySelectorAll('.arrow-icon');
    arrows.forEach((arrow, index) => {
      arrow.addEventListener('click', () => {
        const nextSection = document.getElementById(`section${index + 2}`);
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

}
