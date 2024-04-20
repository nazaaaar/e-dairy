import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassCreationModalPage } from './class-creation-modal.page';

describe('ClassCreationModalPage', () => {
  let component: ClassCreationModalPage;
  let fixture: ComponentFixture<ClassCreationModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassCreationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
