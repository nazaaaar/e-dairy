import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentLessonsPage } from './student-lessons.page';

describe('StudentLessonsPage', () => {
  let component: StudentLessonsPage;
  let fixture: ComponentFixture<StudentLessonsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLessonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
