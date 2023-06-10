import { TestBed } from '@angular/core/testing';

import { ServiceshippingService } from './serviceshipping.service';

describe('ServiceshippingService', () => {
  let service: ServiceshippingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceshippingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
