import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutShopNavbarComponent } from './layout-shop-navbar.component';

describe('ShopLayoutNavbarComponent', () => {
  let component: LayoutShopNavbarComponent;
  let fixture: ComponentFixture<LayoutShopNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutShopNavbarComponent],
    });
    fixture = TestBed.createComponent(LayoutShopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
