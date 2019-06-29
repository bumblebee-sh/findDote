import { TestBed, inject } from '@angular/core/testing';

import { ActionStatusService } from './action-status.service';

describe('ActionStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionStatusService]
    });
  });

  it('should be created', inject([ActionStatusService], (service: ActionStatusService) => {
    expect(service).toBeTruthy();
  }));
});
