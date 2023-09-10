import { TestBed } from '@angular/core/testing';

import { SelectedParentCategoryService } from './selected-parent-category.service';

describe('SelectedParentCategoryService', () => {
  let service: SelectedParentCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedParentCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
