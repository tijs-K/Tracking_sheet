import { Component, input, computed } from '@angular/core';
import { ApplicationStatus } from '../../models/application.model';

@Component({
  selector: 'app-status-badge',
  template: `
    <span [class]="badgeClass()">
      {{ status() }}
    </span>
  `,
})
export class StatusBadge {
  readonly status = input.required<ApplicationStatus | string>();
  private readonly statusClasses: Record<string, string> = {
    Applied:
      'font-medium inline-block w-auto rounded-full bg-blue-100 py-1.5 px-3 text-center text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 dark:border dark:border-blue-800/40',
    Interview:
      'font-medium inline-block w-auto rounded-full bg-amber-100 py-1.5 px-3 text-center text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 dark:border dark:border-amber-800/40',
    Offer:
      'font-medium inline-block w-auto rounded-full bg-green-100 py-1.5 px-3 text-center text-green-700 dark:bg-green-950/50 dark:text-green-400 dark:border dark:border-green-800/40',
    Rejected:
      'font-medium inline-block w-auto rounded-full bg-red-100 py-1.5 px-3 text-center text-red-700 dark:bg-red-950/50 dark:text-red-400 dark:border dark:border-red-800/40',
  };
  readonly badgeClass = computed(() => {
    return this.statusClasses[this.status()] || this.statusClasses['Applied'];
  });
}
