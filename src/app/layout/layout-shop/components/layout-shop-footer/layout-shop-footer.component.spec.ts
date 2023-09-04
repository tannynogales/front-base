import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLayoutFooterComponent } from './layout-shop-footer.component';

describe('ShopLayoutFooterComponent', () => {
  let component: ShopLayoutFooterComponent;
  let fixture: ComponentFixture<ShopLayoutFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopLayoutFooterComponent],
    });
    fixture = TestBed.createComponent(ShopLayoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
