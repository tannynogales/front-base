import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartPaymentComponent } from './shop-cart-payment.component';

describe('ShopCartPaymentComponent', () => {
  let component: ShopCartPaymentComponent;
  let fixture: ComponentFixture<ShopCartPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopCartPaymentComponent]
    });
    fixture = TestBed.createComponent(ShopCartPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
