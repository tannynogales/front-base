import { TestBed } from '@angular/core/testing';

import { ParentCategoriesService } from './parent-categories.service';

describe('ParentCategoriesService', () => {
  let service: ParentCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
