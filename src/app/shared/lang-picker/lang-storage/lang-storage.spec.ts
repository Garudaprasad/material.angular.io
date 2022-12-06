import { TestBed } from '@angular/core/testing';

import { LangStorage } from './lang-storage';

describe('LangStorageService', () => {
  let service: LangStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LangStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
