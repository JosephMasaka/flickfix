import { TestBed } from '@angular/core/testing';

import { SearchTMDBService } from './search-tmdb.service';

describe('SearchTMDBService', () => {
  let service: SearchTMDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTMDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
