import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentLessonPage } from './current-lesson.page';

describe('CurrentLessonPage', () => {
  let component: CurrentLessonPage;
  let fixture: ComponentFixture<CurrentLessonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentLessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
