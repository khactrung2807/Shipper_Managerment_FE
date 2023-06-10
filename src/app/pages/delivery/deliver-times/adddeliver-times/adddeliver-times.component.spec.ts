import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddeliverTimesComponent } from './adddeliver-times.component';

describe('AdddeliverTimesComponent', () => {
  let component: AdddeliverTimesComponent;
  let fixture: ComponentFixture<AdddeliverTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddeliverTimesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddeliverTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
