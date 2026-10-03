import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute application statistics', () => {
    expect(component.totalApplications).toBeGreaterThanOrEqual(0);
    expect(component.interviewCount).toBeGreaterThanOrEqual(0);
    expect(component.offerCount).toBeGreaterThanOrEqual(0);
    expect(component.rejectedCount).toBeGreaterThanOrEqual(0);
  });
});
