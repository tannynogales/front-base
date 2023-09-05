import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductListFiltersComponent } from './shop-product-list-filters.component';

describe('ShopProductListFiltersComponent', () => {
  let component: ShopProductListFiltersComponent;
  let fixture: ComponentFixture<ShopProductListFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopProductListFiltersComponent]
    });
    fixture = TestBed.createComponent(ShopProductListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
