import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMarkPage } from './add-mark.page';

describe('AddMarkPage', () => {
  let component: AddMarkPage;
  let fixture: ComponentFixture<AddMarkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
