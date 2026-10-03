import { TestBed } from '@angular/core/testing';
import { ThemeService } from './themeService';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow setting theme', () => {
    service.setTheme('dark');
    expect(service.theme()).toBe('dark');

    service.setTheme('light');
    expect(service.theme()).toBe('light');

    service.setTheme('system');
    expect(service.theme()).toBe('system');
  });
});
