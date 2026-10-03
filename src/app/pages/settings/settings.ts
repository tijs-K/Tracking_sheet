import { Component, inject } from '@angular/core';
import { Tile } from '../../layout/tile/tile';
import { ThemeService, ThemeMode } from '../../services/themeService';

export interface PipelineStage {
  id: number;
  name: string;
  badgeClass: string;
  description: string;
  isDefault?: boolean;
}

@Component({
  selector: 'app-settings',
  imports: [Tile],
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export class Settings {
  private readonly themeService = inject(ThemeService);

  get selectedTheme(): ThemeMode {
    return this.themeService.theme();
  }

  pipelineStages: PipelineStage[] = [
    {
      id: 1,
      name: 'Applied',
      badgeClass: 'bg-blue-100 text-blue-700 border-blue-200',
      description: 'Initial application submitted',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Screening',
      badgeClass: 'bg-purple-100 text-purple-700 border-purple-200',
      description: 'Recruiter or introductory call',
      isDefault: false,
    },
    {
      id: 3,
      name: 'Interview',
      badgeClass: 'bg-amber-100 text-amber-700 border-amber-200',
      description: 'Technical, portfolio, or team interviews',
      isDefault: true,
    },
    {
      id: 4,
      name: 'Offer',
      badgeClass: 'bg-green-100 text-green-700 border-green-200',
      description: 'Formal job offer received',
      isDefault: true,
    },
    {
      id: 5,
      name: 'Rejected',
      badgeClass: 'bg-red-100 text-red-700 border-red-200',
      description: 'Application closed or not moving forward',
      isDefault: true,
    },
  ];

  selectTheme(theme: ThemeMode): void {
    this.themeService.setTheme(theme);
  }
}
