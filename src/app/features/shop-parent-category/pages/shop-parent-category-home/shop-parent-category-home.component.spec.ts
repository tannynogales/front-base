import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopParentCategoryHomeComponent } from './shop-parent-category-home.component';

describe('ShopParentCategoryHomeComponent', () => {
  let component: ShopParentCategoryHomeComponent;
  let fixture: ComponentFixture<ShopParentCategoryHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopParentCategoryHomeComponent]
    });
    fixture = TestBed.createComponent(ShopParentCategoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
