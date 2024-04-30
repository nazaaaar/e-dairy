import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentLessonDetailsPage } from './student-lesson-details.page';

describe('StudentLessonDetailsPage', () => {
  let component: StudentLessonDetailsPage;
  let fixture: ComponentFixture<StudentLessonDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLessonDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
