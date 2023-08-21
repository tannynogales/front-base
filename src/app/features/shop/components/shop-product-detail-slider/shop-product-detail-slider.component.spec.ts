import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductDetailSliderComponent } from './shop-product-detail-slider.component';

describe('ShopProductDetailSliderComponent', () => {
  let component: ShopProductDetailSliderComponent;
  let fixture: ComponentFixture<ShopProductDetailSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopProductDetailSliderComponent]
    });
    fixture = TestBed.createComponent(ShopProductDetailSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
