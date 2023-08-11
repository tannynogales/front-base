import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLayoutNavbarComponent } from './shop-layout-navbar.component';

describe('ShopLayoutNavbarComponent', () => {
  let component: ShopLayoutNavbarComponent;
  let fixture: ComponentFixture<ShopLayoutNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopLayoutNavbarComponent]
    });
    fixture = TestBed.createComponent(ShopLayoutNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
