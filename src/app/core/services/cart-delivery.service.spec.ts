import { TestBed } from '@angular/core/testing';

import { CartDeliveryService } from './cart-delivery.service';

describe('CartDeliveryService', () => {
  let service: CartDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
