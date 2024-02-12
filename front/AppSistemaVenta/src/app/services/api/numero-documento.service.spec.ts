import { TestBed } from '@angular/core/testing';

import { NumeroDocumentoService } from './numero-documento.service';

describe('NumeroDocumentoService', () => {
  let service: NumeroDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumeroDocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
