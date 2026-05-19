import { TestBed } from '@angular/core/testing';

import { AddSuggestionService } from './add-suggestion.service';

describe('AddSuggestionService', () => {
  let service: AddSuggestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddSuggestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
