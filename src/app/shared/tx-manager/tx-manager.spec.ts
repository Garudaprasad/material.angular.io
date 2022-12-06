import { TestBed } from '@angular/core/testing';

import { TxManager } from './tx-manager';

describe('TxManagerService', () => {
  let service: TxManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TxManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
