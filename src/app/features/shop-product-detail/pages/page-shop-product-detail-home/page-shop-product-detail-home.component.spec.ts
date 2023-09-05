import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageShopProductDetailHomeComponent } from './page-shop-product-detail-home.component';

describe('PageShopProductDetailHomeComponent', () => {
  let component: PageShopProductDetailHomeComponent;
  let fixture: ComponentFixture<PageShopProductDetailHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageShopProductDetailHomeComponent]
    });
    fixture = TestBed.createComponent(PageShopProductDetailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
