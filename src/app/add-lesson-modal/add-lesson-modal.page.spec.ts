import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddLessonModalPage } from './add-lesson-modal.page';

describe('AddLessonModalPage', () => {
  let component: AddLessonModalPage;
  let fixture: ComponentFixture<AddLessonModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLessonModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
