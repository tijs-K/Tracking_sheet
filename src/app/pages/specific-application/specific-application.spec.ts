import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecificApplication } from './specific-application';

describe('SpecificApplication', () => {
  let component: SpecificApplication;
  let fixture: ComponentFixture<SpecificApplication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificApplication],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecificApplication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
