import { inject, Injectable, signal } from '@angular/core';
export * from '../models/application.model';
import {
  Application,
  ApplicationStatus,
  InterviewLog,
  HiringContact,
  ProcessTimelineEvent,
} from '../models/application.model';
import { MOCK_APPLICATIONS } from '../models/mock-applications';
import { ApplicationApiService } from './application-api.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private api = inject(ApplicationApiService);

  readonly applications = signal<Application[]>([...MOCK_APPLICATIONS]);

  constructor() {
    this.loadApplications();
  }

  getApplications(): Application[] {
    return this.applications();
  }

  async loadApplications(): Promise<Application[]> {
    try {
      const data = await this.api.getAll();
      if (Array.isArray(data) && data.length > 0) {
        this.applications.set(data);
      }
    } catch (error) {
      console.warn('Backend unavailable, using local mock data:', error);
    }
    return this.applications();
  }

  getApplicationById(id: number): Application | undefined {
    return this.applications().find((app) => app.id === id);
  }

  getInterviewLogsLatest(id: number): InterviewLog[] {
    const app = this.getApplicationById(id);
    return app?.interviewLog
      ? [...app.interviewLog].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      : [];
  }

  updateNotes(id: number, notes: string): void {
    this.updateAppState(id, (app) => ({ ...app, notes }));
    this.api.update(id, { notes }).catch((err) => console.warn('Failed to sync notes:', err));
  }

  async updateApplication(
    id: number,
    data: Partial<Application>,
  ): Promise<Application | undefined> {
    const current = this.getApplicationById(id);
    const saved = await this.api
      .update(id, data)
      .catch(() => ({ ...current, ...data }) as Application);
    this.updateAppState(id, (app) => ({ ...app, ...saved }));
    return this.getApplicationById(id);
  }

  async addInterviewLog(
    id: number,
    log: { date: string; type: string; notes: string },
  ): Promise<InterviewLog> {
    const saved = await this.api.addInterviewLog(id, log).catch(() => ({ ...log }) as InterviewLog);
    this.updateAppState(id, (app) => ({
      ...app,
      interviewLog: [saved, ...(app.interviewLog || [])],
    }));
    return saved;
  }

  async addHiringContact(
    id: number,
    contact: { name: string; role: string; email: string },
  ): Promise<HiringContact> {
    const saved = await this.api
      .addHiringContact(id, contact)
      .catch(() => ({ ...contact }) as HiringContact);
    this.updateAppState(id, (app) => ({
      ...app,
      hiringContacts: [...(app.hiringContacts || []), saved],
    }));
    return saved;
  }

  async addTimelineEvent(
    id: number,
    event: { label: string; date: string; completed: boolean },
  ): Promise<ProcessTimelineEvent> {
    const saved = await this.api
      .addTimelineEvent(id, event)
      .catch(() => ({ ...event }) as ProcessTimelineEvent);
    this.updateAppState(id, (app) => ({
      ...app,
      processTimeline: [...(app.processTimeline || []), saved],
    }));
    return saved;
  }

  async addApplication(data: {
    company: string;
    position: string;
    url?: string;
    salaryRange?: string;
    dateApplied?: string;
    status: ApplicationStatus;
    notes?: string;
  }): Promise<Application> {
    const current = this.applications();
    const nextId = current.length > 0 ? Math.max(...current.map((a) => a.id)) + 1 : 1;

    const initial: Application = {
      id: nextId,
      company: data.company,
      position: data.position,
      status: data.status,
      dateApplied: data.dateApplied || 'Today',
      salaryRange: data.salaryRange || '',
      url: data.url || '',
      notes: data.notes || '',
      interviewLog: [],
      hiringContacts: [],
      processTimeline: [
        { label: 'Application submitted', date: data.dateApplied || 'Today', completed: true },
      ],
    };

    const saved = await this.api.create(data).catch(() => initial);
    const finalApp: Application = { ...initial, ...saved };
    this.applications.update((apps) => [finalApp, ...apps]);
    return finalApp;
  }

  private updateAppState(id: number, updater: (app: Application) => Application): void {
    this.applications.update((apps) => apps.map((app) => (app.id === id ? updater(app) : app)));
  }
}
