import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassHomeworkPage } from './class-homework.page';

describe('ClassHomeworkPage', () => {
  let component: ClassHomeworkPage;
  let fixture: ComponentFixture<ClassHomeworkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassHomeworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
