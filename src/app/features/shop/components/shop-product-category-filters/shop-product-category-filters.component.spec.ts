import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductCategoryFiltersComponent } from './shop-product-category-filters.component';

describe('ShopProductCategoryFiltersComponent', () => {
  let component: ShopProductCategoryFiltersComponent;
  let fixture: ComponentFixture<ShopProductCategoryFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopProductCategoryFiltersComponent]
    });
    fixture = TestBed.createComponent(ShopProductCategoryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
