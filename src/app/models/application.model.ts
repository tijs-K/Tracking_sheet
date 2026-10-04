export type ApplicationStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface InterviewLog {
  date: string;
  type: string;
  notes: string;
}
export interface HiringContact {
  name: string;
  role: string;
  email: string;
}
export interface ProcessTimelineEvent {
  label: string;
  date: string;
  completed: boolean;
}
export interface Application {
  id: number;
  company: string;
  position: string;
  dateApplied: string;
  status: ApplicationStatus;
  statusClass?: string;
  url: string;
  salaryRange: string;
  notes: string;
  interviewLog: InterviewLog[];
  hiringContacts: HiringContact[];
  processTimeline: ProcessTimelineEvent[];
}
