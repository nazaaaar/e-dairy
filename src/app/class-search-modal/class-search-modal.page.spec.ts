import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassSearchModalPage } from './class-search-modal.page';

describe('ClassSearchModalPage', () => {
  let component: ClassSearchModalPage;
  let fixture: ComponentFixture<ClassSearchModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSearchModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
