import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tile } from '../../layout/tile/tile';
import { ApplicationService, Application } from '../../services/applicationService';

import { StatusBadge } from '../../layout/status-badge/status-badge';

@Component({
  selector: 'app-dashboard',
  imports: [Tile, RouterLink, StatusBadge],
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly applicationService = inject(ApplicationService);

  get applications(): readonly Application[] {
    return this.applicationService.getApplications();
  }

  get totalApplications(): number {
    return this.applications.length;
  }

  get interviewCount(): number {
    return this.applications.filter((app) => app.status === 'Interview').length;
  }

  get offerCount(): number {
    return this.applications.filter((app) => app.status === 'Offer').length;
  }

  get rejectedCount(): number {
    return this.applications.filter((app) => app.status === 'Rejected').length;
  }

  get recentApplications(): readonly Application[] {
    return this.applications.slice(0, 5);
  }
}
