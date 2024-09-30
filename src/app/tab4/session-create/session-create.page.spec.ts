import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionCreatePage } from './session-create.page';

describe('SessionCreatePage', () => {
  let component: SessionCreatePage;
  let fixture: ComponentFixture<SessionCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
