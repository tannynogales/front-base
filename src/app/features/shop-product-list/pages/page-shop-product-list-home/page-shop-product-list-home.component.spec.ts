import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageShopProductListHomeComponent } from './page-shop-product-list-home.component';

describe('PageShopProductListHomeComponent', () => {
  let component: PageShopProductListHomeComponent;
  let fixture: ComponentFixture<PageShopProductListHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageShopProductListHomeComponent]
    });
    fixture = TestBed.createComponent(PageShopProductListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
