import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartSuccessComponent } from './shop-cart-success.component';

describe('ShopCartSuccessComponent', () => {
  let component: ShopCartSuccessComponent;
  let fixture: ComponentFixture<ShopCartSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopCartSuccessComponent]
    });
    fixture = TestBed.createComponent(ShopCartSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
