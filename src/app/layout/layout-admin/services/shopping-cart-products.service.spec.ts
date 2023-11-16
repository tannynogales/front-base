import { TestBed } from '@angular/core/testing';

import { ShoppingCartProductsService } from './shopping-cart-products.service';

describe('ShoppingCartProductsService', () => {
  let service: ShoppingCartProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
