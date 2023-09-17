import { TestBed } from '@angular/core/testing';

import { ParentCategoryProductsService } from './parent-category-products.service';

describe('ParentCategoryProductsService', () => {
  let service: ParentCategoryProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentCategoryProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
