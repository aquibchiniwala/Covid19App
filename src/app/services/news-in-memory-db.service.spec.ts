import { TestBed } from '@angular/core/testing';

import { NewsInMemoryDbService } from './news-in-memory-db.service';

describe('NewsInMemoryDbService', () => {
  let service: NewsInMemoryDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsInMemoryDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
