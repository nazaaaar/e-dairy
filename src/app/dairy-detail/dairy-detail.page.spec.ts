import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DairyDetailPage } from './dairy-detail.page';

describe('DairyDetailPage', () => {
  let component: DairyDetailPage;
  let fixture: ComponentFixture<DairyDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DairyDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
