import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleTabsPage } from './schedule-tabs.page';

describe('ScheduleTabsPage', () => {
  let component: ScheduleTabsPage;
  let fixture: ComponentFixture<ScheduleTabsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
