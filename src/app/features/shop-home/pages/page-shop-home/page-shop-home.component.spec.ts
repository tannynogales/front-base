import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageShopHomeComponent } from './page-shop-home.component';

describe('PageShopHomeComponent', () => {
  let component: PageShopHomeComponent;
  let fixture: ComponentFixture<PageShopHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageShopHomeComponent]
    });
    fixture = TestBed.createComponent(PageShopHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
