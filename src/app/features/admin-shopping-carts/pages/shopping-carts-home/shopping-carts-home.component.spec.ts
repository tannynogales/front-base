import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartsHomeComponent } from './shopping-carts-home.component';

describe('ShoppingCartsHomeComponent', () => {
  let component: ShoppingCartsHomeComponent;
  let fixture: ComponentFixture<ShoppingCartsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartsHomeComponent]
    });
    fixture = TestBed.createComponent(ShoppingCartsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
