import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassStudentsPage } from './class-students.page';

describe('ClassStudentsPage', () => {
  let component: ClassStudentsPage;
  let fixture: ComponentFixture<ClassStudentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassStudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
