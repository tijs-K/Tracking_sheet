import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusBadge } from '../../layout/status-badge/status-badge';
import { Tile } from '../../layout/tile/tile';
import { Application, ApplicationService, InterviewLog } from '../../services/applicationService';
import { EditModal } from './edit-modal/edit-modal';
import { LogActivityModal } from './log-activity-modal/log-activity-modal';

@Component({
  imports: [Tile, StatusBadge, EditModal, LogActivityModal],
  selector: 'app-specific-application',
  styleUrl: './specific-application.css',
  templateUrl: './specific-application.html',
})
export class SpecificApplication {
  private route = inject(ActivatedRoute);
  private applicationservice = inject(ApplicationService);

  readonly appId = Number(this.route.snapshot.paramMap.get('id'));
  readonly isEditModalOpen = signal(false);
  readonly isLogModalOpen = signal(false);

  get application(): Application | undefined {
    return this.applicationservice.getApplicationById(this.appId);
  }

  get interviewLogs(): InterviewLog[] {
    return this.applicationservice.getInterviewLogsLatest(this.appId);
  }

  get processTimeline() {
    return [...(this.application?.processTimeline ?? [])].reverse();
  }

  saveNotes(event: Event): void {
    const notes = (event.target as HTMLTextAreaElement).value;
    if (this.application) {
      this.applicationservice.updateNotes(this.appId, notes);
    }
  }
}
