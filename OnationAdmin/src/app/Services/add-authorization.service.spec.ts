import { TestBed } from '@angular/core/testing';

import { AddAuthorizationService } from './add-authorization.service';

describe('AddAuthorizationService', () => {
  let service: AddAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
