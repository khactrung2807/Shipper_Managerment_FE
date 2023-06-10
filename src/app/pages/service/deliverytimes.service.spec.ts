import { TestBed } from '@angular/core/testing';

import { DeliverytimesService } from './deliverytimes.service';

describe('DeliverytimesService', () => {
  let service: DeliverytimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverytimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
