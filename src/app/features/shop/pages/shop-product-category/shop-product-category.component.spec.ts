import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductCategoryComponent } from './shop-product-category.component';

describe('ShopProductCategoryComponent', () => {
  let component: ShopProductCategoryComponent;
  let fixture: ComponentFixture<ShopProductCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopProductCategoryComponent]
    });
    fixture = TestBed.createComponent(ShopProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
