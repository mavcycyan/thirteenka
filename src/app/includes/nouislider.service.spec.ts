import { TestBed } from '@angular/core/testing';

import { NouisliderService } from './nouislider.service';

describe('NouisliderService', () => {
  let service: NouisliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NouisliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
