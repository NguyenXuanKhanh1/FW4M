import { TestBed } from '@angular/core/testing';

import { DashboardDemoService } from './dashboard-demo.service';

describe('DashboardDemoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardDemoService = TestBed.get(DashboardDemoService);
    expect(service).toBeTruthy();
  });
});
