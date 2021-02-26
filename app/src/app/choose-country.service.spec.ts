import { TestBed } from '@angular/core/testing';

import { ChooseCountryService } from './choose-country.service';

describe('ChooseCountryService', () => {
  let service: ChooseCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChooseCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
