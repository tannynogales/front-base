import { TestBed } from '@angular/core/testing';

import { BannerHomeService } from './banner-home.service';

describe('BannerHomeService', () => {
  let service: BannerHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
