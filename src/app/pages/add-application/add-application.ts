import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApplicationService, ApplicationStatus } from '../../services/applicationService';
import { Tile } from '../../layout/tile/tile';

@Component({
  selector: 'app-add-application',
  imports: [ReactiveFormsModule, Tile, RouterLink],
  templateUrl: './add-application.html',
  styleUrl: './add-application.css',
})
export class AddApplication {
  private fb = inject(FormBuilder);
  private appService = inject(ApplicationService);
  private router = inject(Router);

  // Define the form structure & validation
  form = this.fb.group({
    company: ['', Validators.required],
    position: ['', Validators.required],
    url: [''],
    salaryRange: [''],
    dateApplied: [''],
    status: ['Applied'],
    notes: [''],
  });

  onSubmit() {
    if (this.form.valid) {
      const val = this.form.value;

      this.appService.addApplication({
        company: val.company!,
        position: val.position!,
        url: val.url || '',
        salaryRange: val.salaryRange || '',
        dateApplied: val.dateApplied || '',
        status: (val.status as ApplicationStatus) || 'Applied',
        notes: val.notes || '',
      });

      this.router.navigate(['/applications']);
    }
  }
}
