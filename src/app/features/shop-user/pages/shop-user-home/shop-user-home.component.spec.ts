import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopUserHomeComponent } from './shop-user-home.component';

describe('ShopUserHomeComponent', () => {
  let component: ShopUserHomeComponent;
  let fixture: ComponentFixture<ShopUserHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopUserHomeComponent]
    });
    fixture = TestBed.createComponent(ShopUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
