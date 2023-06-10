import { TestBed } from '@angular/core/testing';

import { DeliveryTimesService } from './delivery-times.service';

describe('DeliveryTimesService', () => {
  let service: DeliveryTimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryTimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
