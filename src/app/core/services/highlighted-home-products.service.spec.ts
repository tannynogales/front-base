import { TestBed } from '@angular/core/testing';

import { HighlightedHomeProductsService } from './highlighted-home-products.service';

describe('HighlightedHomeProductsService', () => {
  let service: HighlightedHomeProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighlightedHomeProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
