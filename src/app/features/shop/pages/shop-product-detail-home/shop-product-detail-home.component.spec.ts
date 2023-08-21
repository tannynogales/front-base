import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductDetailHomeComponent } from './shop-product-detail-home.component';

describe('ShopProductDetailHomeComponent', () => {
  let component: ShopProductDetailHomeComponent;
  let fixture: ComponentFixture<ShopProductDetailHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopProductDetailHomeComponent]
    });
    fixture = TestBed.createComponent(ShopProductDetailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
