import { TestBed } from '@angular/core/testing';

import { DeleteAuthorizationService } from './delete-authorization.service';

describe('DeleteAuthorizationService', () => {
  let service: DeleteAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
