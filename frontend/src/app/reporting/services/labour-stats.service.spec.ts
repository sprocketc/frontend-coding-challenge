import { TestBed } from '@angular/core/testing';

import { LabourStatsService } from './labour-stats.service';

describe('LabourStatsService', () => {
  let service: LabourStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabourStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
