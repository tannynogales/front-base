import { TestBed } from '@angular/core/testing';

import { PrivatePagesService } from './private-pages.service';

describe('PrivatePagesService', () => {
  let service: PrivatePagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivatePagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
