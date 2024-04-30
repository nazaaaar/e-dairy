import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassLessonsPage } from './class-lessons.page';

describe('ClassLessonsPage', () => {
  let component: ClassLessonsPage;
  let fixture: ComponentFixture<ClassLessonsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassLessonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
