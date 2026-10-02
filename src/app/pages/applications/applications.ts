import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Application,
  ApplicationService,
  ApplicationStatus,
} from '../../services/applicationService';

@Component({
  imports: [RouterLink],
  selector: 'app-applications',
  styleUrl: './applications.css',
  templateUrl: './applications.html',
})
export class Applications {
  readonly statuses: readonly ('All' | ApplicationStatus)[] = [
    'All',
    'Applied',
    'Interview',
    'Offer',
    'Rejected',
  ];

  selectedStatus: 'All' | ApplicationStatus = 'All';

  readonly applications: readonly Application[];
  constructor(applicationService: ApplicationService) {
    this.applications = applicationService.getApplications();
  }

  get filteredApplications(): readonly Application[] {
    if (this.selectedStatus === 'All') {
      return this.applications;
    }

    return this.applications.filter((application) => application.status === this.selectedStatus);
  }

  selectStatus(status: 'All' | ApplicationStatus): void {
    this.selectedStatus = status;
  }
}
