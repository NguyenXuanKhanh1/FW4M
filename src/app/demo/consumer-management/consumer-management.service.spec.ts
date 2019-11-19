import { TestBed } from '@angular/core/testing';

import { ConsumerManagementService } from './consumer-management.service';

describe('ConsumerManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsumerManagementService = TestBed.get(ConsumerManagementService);
    expect(service).toBeTruthy();
  });
});
