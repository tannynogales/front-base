import { TestBed } from '@angular/core/testing';

import { CartBillingService } from './cart-billing.service';

describe('CartBillingService', () => {
  let service: CartBillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartBillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
