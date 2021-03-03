import { TestBed } from '@angular/core/testing';

import { MovieCreationService } from './movie-creation.service';

describe('MovieCreationService', () => {
  let service: MovieCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
