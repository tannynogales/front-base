import { TestBed } from '@angular/core/testing';

import { CartUserEmailService } from './cart-user.service';

describe('CartUserEmailService', () => {
  let service: CartUserEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartUserEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
