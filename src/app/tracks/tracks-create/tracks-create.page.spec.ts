import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TracksCreatePage } from './tracks-create.page';

describe('TracksCreatePage', () => {
  let component: TracksCreatePage;
  let fixture: ComponentFixture<TracksCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
