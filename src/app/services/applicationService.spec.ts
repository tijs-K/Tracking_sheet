import { TestBed } from '@angular/core/testing';
import { ApplicationService } from './applicationService';

describe('ApplicationService', () => {
  let service: ApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial applications', () => {
    const apps = service.getApplications();
    expect(apps.length).toBeGreaterThan(0);
  });

  it('should add a new application', () => {
    const initialCount = service.getApplications().length;
    service.addApplication({
      company: 'Test Company',
      position: 'Developer',
      status: 'Applied',
    });

    expect(service.getApplications().length).toBe(initialCount + 1);
    expect(service.getApplications()[0].company).toBe('Test Company');
  });
});
