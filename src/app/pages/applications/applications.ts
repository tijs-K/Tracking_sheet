import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ApplicationService,
  Application,
  ApplicationStatus,
} from '../../services/applicationService';

import { StatusBadge } from '../../layout/status-badge/status-badge';

@Component({
  imports: [RouterLink, StatusBadge],
  selector: 'app-applications',
  styleUrl: './applications.css',
  templateUrl: './applications.html',
})
export class Applications {
  private readonly applicationService = inject(ApplicationService);

  readonly statuses: readonly ('All' | ApplicationStatus)[] = [
    'All',
    'Applied',
    'Interview',
    'Offer',
    'Rejected',
  ];

  readonly selectedStatus = signal<'All' | ApplicationStatus>('All');
  readonly searchTerm = signal('');

  get applications(): readonly Application[] {
    return this.applicationService.getApplications();
  }

  readonly filteredApplications = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const status = this.selectedStatus();
    return this.applications.filter((application) => {
      const matchesStatus = status === 'All' || application.status === status;
      const matchesSearch =
        term === '' ||
        application.company.toLowerCase().includes(term) ||
        application.position.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  });

  selectStatus(status: 'All' | ApplicationStatus): void {
    this.selectedStatus.set(status);
  }
}
