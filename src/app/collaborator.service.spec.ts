import { TestBed, inject } from '@angular/core/testing';

import { CollaboratorService } from './collaborator.service';

describe('CollaboratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollaboratorService]
    });
  });

  it('should create a service.', inject([CollaboratorService], (service: CollaboratorService) => {
    expect(service).toBeTruthy();
  }));
});
