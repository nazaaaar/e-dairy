import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddStudentModalPage } from './add-student-modal.page';

describe('AddStudentModalPage', () => {
  let component: AddStudentModalPage;
  let fixture: ComponentFixture<AddStudentModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
