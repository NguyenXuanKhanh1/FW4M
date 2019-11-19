import { TestBed } from '@angular/core/testing';

import { AddConsumerService } from './add-consumer.service';

describe('AddConsumerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddConsumerService = TestBed.get(AddConsumerService);
    expect(service).toBeTruthy();
  });
});
