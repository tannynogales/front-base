import { TestBed } from '@angular/core/testing';

import { UtilitiesChileRegionesService } from './utilities-chile-regiones.service';

describe('UtilitiesChileRegionesService', () => {
  let service: UtilitiesChileRegionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitiesChileRegionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
