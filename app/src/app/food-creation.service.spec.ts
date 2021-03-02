import { TestBed } from '@angular/core/testing';

import { FoodCreationService } from './food-creation.service';

describe('FoodCreationService', () => {
  let service: FoodCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
