import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassTabsPage } from './class-tabs.page';

describe('ClassTabsPage', () => {
  let component: ClassTabsPage;
  let fixture: ComponentFixture<ClassTabsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
