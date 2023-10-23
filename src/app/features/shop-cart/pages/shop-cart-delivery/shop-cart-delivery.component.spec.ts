import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartDeliveryComponent } from './ShopCartDeliveryComponent';

describe('ShopCartDeliveryComponent', () => {
  let component: ShopCartDeliveryComponent;
  let fixture: ComponentFixture<ShopCartDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopCartDeliveryComponent],
    });
    fixture = TestBed.createComponent(ShopCartDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
