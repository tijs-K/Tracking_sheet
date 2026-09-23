import { TestBed } from '@angular/core/testing';
import { ApplicationService } from './applicationService';

describe('ApplicationService', () => {
  let service: ApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationService);
  });
});
