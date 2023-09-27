import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartHomeComponent } from './shop-cart-home.component';

describe('ShopCartHomeComponent', () => {
  let component: ShopCartHomeComponent;
  let fixture: ComponentFixture<ShopCartHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopCartHomeComponent],
    });
    fixture = TestBed.createComponent(ShopCartHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
