import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartBillingComponent } from './shop-cart-billing.component';

describe('ShopCartBillingComponent', () => {
  let component: ShopCartBillingComponent;
  let fixture: ComponentFixture<ShopCartBillingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopCartBillingComponent]
    });
    fixture = TestBed.createComponent(ShopCartBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
