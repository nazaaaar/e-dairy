import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleEditorPage } from './schedule-editor.page';

describe('ScheduleEditorPage', () => {
  let component: ScheduleEditorPage;
  let fixture: ComponentFixture<ScheduleEditorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
