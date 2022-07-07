import { TestBed } from '@angular/core/testing';

import { SportsClubApiService } from './sportsClub-api.service';

describe('SportsclubApiService', () => {
  let service: SportsClubApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportsClubApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
