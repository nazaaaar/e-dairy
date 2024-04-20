import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentHomeworkPage } from './student-homework.page';

describe('StudentHomeworkPage', () => {
  let component: StudentHomeworkPage;
  let fixture: ComponentFixture<StudentHomeworkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHomeworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
