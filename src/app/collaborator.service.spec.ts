import { TestBed, inject } from '@angular/core/testing';

import { CollaboratorService } from './collaborator.service';
import { HttpModule } from '@angular/http';

describe('CollaboratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollaboratorService],
      imports: [
        HttpModule
      ]
    });
  });

  it('should create a service.', inject([CollaboratorService], (service: CollaboratorService) => {
    expect(service).toBeTruthy();
  }));
});
