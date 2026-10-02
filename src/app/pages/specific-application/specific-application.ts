import { Component } from '@angular/core';
import { Application, ApplicationService, InterviewLog } from '../../services/applicationService';

import { ActivatedRoute } from '@angular/router';
import { Tile } from '../../layout/tile/tile';

@Component({
  imports: [Tile],
  selector: 'app-specific-application',
  styleUrl: './specific-application.css',
  templateUrl: './specific-application.html',
})
export class SpecificApplication {
  readonly application: Application | undefined;
  readonly interviewLogs: InterviewLog[];
  readonly processTimeline: Application['processTimeline'];

  constructor(
    private route: ActivatedRoute,
    private applicationservice: ApplicationService,
  ) {
    const idText = this.route.snapshot.paramMap.get('id');
    const id = Number(idText);
    this.application = this.applicationservice.getApplicationById(id);
    this.interviewLogs = this.applicationservice.getInterviewLogsLatest(id);
    this.processTimeline = [...(this.application?.processTimeline ?? [])].reverse();
  }

  saveNotes(event: Event): void {
    const notes = (event.target as HTMLTextAreaElement).value;

    if (this.application) {
      this.applicationservice.updateNotes(this.application.id, notes);
    }
  }
}
