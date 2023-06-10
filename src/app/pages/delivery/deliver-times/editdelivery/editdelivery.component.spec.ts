import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdeliveryComponent } from './editdelivery.component';

describe('EditdeliveryComponent', () => {
  let component: EditdeliveryComponent;
  let fixture: ComponentFixture<EditdeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
