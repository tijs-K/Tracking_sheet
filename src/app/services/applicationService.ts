import {Injectable} from '@angular/core'

export type ApplicationStatus =
  | 'Applied'
  | 'Interview'
  | 'Offer'
  | 'Rejected';

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
  statusClass: string;
  url: string;
  salaryRange: string;
  notes: string;
  interviewLog: InterviewLog[];
  hiringContacts: HiringContact[];
  processTimeline: ProcessTimelineEvent[];
}



@Injectable({
    providedIn: 'root',
})
export class ApplicationService {

    //temp hardcoded data, for design development
    readonly applications: readonly Application[] = [
        {
        id: 1,
        company: 'Northstar Labs',
        position: 'Frontend Developer',
        dateApplied: 'Sep 5, 2026',
        status: 'Interview',
        statusClass: 'font-medium w-auto rounded-full bg-amber-100 py-4 text-center text-amber-600',
        url: 'https://northstarlabs.example/jobs/frontend-developer',
        salaryRange: '$110,000 - $135,000',
        notes: 'Strong focus on design systems and accessible product experiences.',
        interviewLog: [
          { date: 'Sep 10, 2026', type: 'Technical interview', notes: 'Discussed component architecture and testing strategy.' },
          { date: 'Sep 8, 2026', type: 'Recruiter screen', notes: 'Reviewed experience, salary expectations, and availability.' },
          { date: 'Sep 12, 2026', type: 'Team interview', notes: 'Met two frontend engineers and talked through a past project.' },
        ],
        hiringContacts: [
          { name: 'Maya Chen', role: 'Engineering Manager', email: 'maya.chen@northstarlabs.example' },
        ],
        processTimeline: [
          { label: 'Application submitted', date: 'Sep 5, 2026', completed: true },
          { label: 'Recruiter screen', date: 'Sep 8, 2026', completed: true },
          { label: 'Technical interview', date: 'Sep 10, 2026', completed: true },
          { label: 'Team interview', date: 'Next step', completed: false },
        ],
        },
        {
        id: 2,
        company: 'Cedar & Co.',
        position: 'Product Designer',
        dateApplied: 'Sep 2, 2026',
        status: 'Applied',
        statusClass: 'font-medium w-auto rounded-full bg-blue-100 py-4 text-center text-blue-600',
        url: 'https://cedarco.example/careers/product-designer',
        salaryRange: '$95,000 - $120,000',
        notes: 'Portfolio should highlight research-led product improvements.',
        interviewLog: [],
        hiringContacts: [
          { name: 'Jon Bell', role: 'Talent Partner', email: 'jon.bell@cedarco.example' },
        ],
        processTimeline: [
          { label: 'Application submitted', date: 'Sep 2, 2026', completed: true },
          { label: 'Recruiter screen', date: 'Not scheduled', completed: false },
          { label: 'Portfolio review', date: 'Not scheduled', completed: false },
        ],
        },
        {
        id: 3,
        company: 'Brightline Systems',
        position: 'Software Engineer',
        dateApplied: 'Aug 29, 2026',
        status: 'Offer',
        statusClass: 'font-medium w-auto rounded-full bg-green-100 py-4 text-center text-green-600',
        url: 'https://brightline.example/jobs/software-engineer',
        salaryRange: '$125,000 - $150,000',
        notes: 'Offer received. Compare equity and remote-work terms before responding.',
        interviewLog: [
          { date: 'Sep 6, 2026', type: 'Final interview', notes: 'Met the platform team and discussed the first 90 days.' },
        ],
        hiringContacts: [
          { name: 'Luis Romero', role: 'Recruiter', email: 'luis.romero@brightline.example' },
          { name: 'Priya Shah', role: 'Director of Engineering', email: 'priya.shah@brightline.example' },
        ],
        processTimeline: [
          { label: 'Application submitted', date: 'Aug 29, 2026', completed: true },
          { label: 'Recruiter screen', date: 'Sep 1, 2026', completed: true },
          { label: 'Technical interview', date: 'Sep 4, 2026', completed: true },
          { label: 'Offer received', date: 'Sep 9, 2026', completed: true },
        ],
        },
        {
        id: 4,
        company: 'Harbor Technologies',
        position: 'Backend Developer',
        dateApplied: 'Aug 24, 2026',
        status: 'Rejected',
        statusClass: 'font-medium w-auto rounded-full bg-red-100 py-4 text-center text-red-600',
        url: 'https://harbortech.example/careers/backend-developer',
        salaryRange: '$105,000 - $128,000',
        notes: 'Role was closed after the first interview round.',
        interviewLog: [
          { date: 'Aug 28, 2026', type: 'Recruiter screen', notes: 'Reviewed backend experience and availability.' },
        ],
        hiringContacts: [
          { name: 'Amir Patel', role: 'Recruiter', email: 'amir.patel@harbortech.example' },
        ],
        processTimeline: [
          { label: 'Application submitted', date: 'Aug 24, 2026', completed: true },
          { label: 'Recruiter screen', date: 'Aug 28, 2026', completed: true },
          { label: 'Application closed', date: 'Sep 3, 2026', completed: true },
        ],
        },
    ];


    getApplications(){
      return this.applications;
    }
    
    getApplicationById(id: number): Application | undefined {
        return this.applications.find(
            (application) => application.id == id
        )

    }

    getInterviewLogsLatest(id: number): InterviewLog[] {
      const application = this.getApplicationById(id);

      return application
        ? [...application.interviewLog].sort(
          (firstLog, secondLog) => Date.parse(secondLog.date) - Date.parse(firstLog.date)
        )
        : [];
    }

    updateNotes(id: number, notes: string): void {
      const application = this.getApplicationById(id);

      if (application) {
        application.notes = notes;
      }
    }

    

}