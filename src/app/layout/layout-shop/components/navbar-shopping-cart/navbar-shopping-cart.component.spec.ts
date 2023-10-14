import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarShoppingCartComponent } from './navbar-shopping-cart.component';

describe('NavbarShoppingCartComponent', () => {
  let component: NavbarShoppingCartComponent;
  let fixture: ComponentFixture<NavbarShoppingCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarShoppingCartComponent]
    });
    fixture = TestBed.createComponent(NavbarShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
