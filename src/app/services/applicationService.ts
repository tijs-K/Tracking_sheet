import { inject, Injectable } from '@angular/core';
export * from '../models/application.model';
import { Application, ApplicationStatus, InterviewLog } from '../models/application.model';
import { MOCK_APPLICATIONS } from '../models/mock-applications';
import { ApplicationApiService } from './application-api.service';
@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private api = inject(ApplicationApiService);
  // Initialize with mock data as fallback
  applications: Application[] = [...MOCK_APPLICATIONS];
  constructor() {
    this.loadApplications();
  }
  getApplications(): Application[] {
    return this.applications;
  }
  async loadApplications(): Promise<Application[]> {
    try {
      const data = await this.api.getAll();
      if (Array.isArray(data) && data.length > 0) {
        this.applications = data;
      }
      return this.applications;
    } catch (error) {
      console.warn('Backend unavailable, using local mock data:', error);
      return this.applications;
    }
  }
  getApplicationById(id: number): Application | undefined {
    return this.applications.find((app) => app.id === id);
  }
  getInterviewLogsLatest(id: number): InterviewLog[] {
    const app = this.getApplicationById(id);
    return app?.interviewLog
      ? [...app.interviewLog].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      : [];
  }
  updateNotes(id: number, notes: string): void {
    const app = this.getApplicationById(id);
    if (app) {
      app.notes = notes;
    }
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
    const nextId =
      this.applications.length > 0 ? Math.max(...this.applications.map((a) => a.id)) + 1 : 1;
    const fallbackApp: Application = {
      id: nextId,
      company: data.company,
      position: data.position,
      url: data.url || '',
      salaryRange: data.salaryRange || '',
      dateApplied: data.dateApplied || 'Today',
      status: data.status,
      notes: data.notes || '',
      interviewLog: [],
      hiringContacts: [],
      processTimeline: [
        { label: 'Application submitted', date: data.dateApplied || 'Today', completed: true },
      ],
    };
    try {
      const saved = await this.api.create(data);
      const mapped: Application = {
        ...saved,
        interviewLog: saved.interviewLog || [],
        hiringContacts: saved.hiringContacts || [],
        processTimeline: saved.processTimeline || [
          { label: 'Application submitted', date: saved.dateApplied || 'Today', completed: true },
        ],
      };
      this.applications.unshift(mapped);
      return mapped;
    } catch (error) {
      console.warn('Failed to save to backend, storing locally:', error);
      this.applications.unshift(fallbackApp);
      return fallbackApp;
    }
  }
}
