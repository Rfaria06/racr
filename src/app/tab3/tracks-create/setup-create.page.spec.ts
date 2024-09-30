import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupCreatePage } from './setup-create.page';

describe('SetupCreatePage', () => {
  let component: SetupCreatePage;
  let fixture: ComponentFixture<SetupCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
