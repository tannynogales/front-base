import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLayoutComponent } from './shop-layout.component';

describe('ShopLayoutComponent', () => {
  let component: ShopLayoutComponent;
  let fixture: ComponentFixture<ShopLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopLayoutComponent]
    });
    fixture = TestBed.createComponent(ShopLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
