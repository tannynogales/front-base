import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPageHomeComponent } from './shop-page-home.component';

describe('ShopPageHomeComponent', () => {
  let component: ShopPageHomeComponent;
  let fixture: ComponentFixture<ShopPageHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopPageHomeComponent]
    });
    fixture = TestBed.createComponent(ShopPageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
