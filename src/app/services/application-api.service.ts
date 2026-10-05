import { Injectable } from '@angular/core';
import {
  Application,
  InterviewLog,
  HiringContact,
  ProcessTimelineEvent,
} from '../models/application.model';

const API_BASE =
  typeof window === 'undefined'
    ? 'http://backend:8000/api/applications'
    : 'http://localhost:8000/api/applications';

@Injectable({
  providedIn: 'root',
})
export class ApplicationApiService {
  private async request<T>(path = '', init?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  getAll(): Promise<Application[]> {
    return this.request<Application[]>();
  }

  getById(id: number): Promise<Application> {
    return this.request<Application>(`/${id}`);
  }

  create(data: Partial<Application>): Promise<Application> {
    return this.request<Application>('', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  update(id: number, data: Partial<Application>): Promise<Application> {
    return this.request<Application>(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  addInterviewLog(id: number, log: Partial<InterviewLog>): Promise<InterviewLog> {
    return this.request<InterviewLog>(`/${id}/interview-logs`, {
      method: 'POST',
      body: JSON.stringify(log),
    });
  }

  addHiringContact(id: number, contact: Partial<HiringContact>): Promise<HiringContact> {
    return this.request<HiringContact>(`/${id}/contacts`, {
      method: 'POST',
      body: JSON.stringify(contact),
    });
  }

  addTimelineEvent(
    id: number,
    event: Partial<ProcessTimelineEvent>,
  ): Promise<ProcessTimelineEvent> {
    return this.request<ProcessTimelineEvent>(`/${id}/timeline`, {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }
}
