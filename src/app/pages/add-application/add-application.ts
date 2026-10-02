import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApplicationService } from '../../services/applicationService';
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
      console.log('New application:', this.form.value);
      // working on after design is done, for now just log the form value
      this.router.navigate(['/applications']);
    }
  }
}
