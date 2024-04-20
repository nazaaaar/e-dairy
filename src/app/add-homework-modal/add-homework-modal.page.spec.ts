import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHomeworkModalPage } from './add-homework-modal.page';

describe('AddHomeworkModalPage', () => {
  let component: AddHomeworkModalPage;
  let fixture: ComponentFixture<AddHomeworkModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeworkModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
