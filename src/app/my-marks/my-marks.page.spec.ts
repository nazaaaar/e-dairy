import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyMarksPage } from './my-marks.page';

describe('MyMarksPage', () => {
  let component: MyMarksPage;
  let fixture: ComponentFixture<MyMarksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMarksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
