import { TestBed } from '@angular/core/testing';

import { EditAuthorizationService } from './edit-authorization.service';

describe('EditAuthorizationService', () => {
  let service: EditAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
