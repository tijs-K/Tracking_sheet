import { Application } from './application.model';

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 1,
    company: 'Company 1',
    position: 'Frontend Developer',
    dateApplied: 'Sep 5, 2026',
    status: 'Interview',
    statusClass:
      'font-medium w-auto rounded-full bg-amber-100 py-1.5 text-center text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 dark:border dark:border-amber-800/40',
    url: 'https://company1.example/jobs/frontend-developer',
    salaryRange: '$110,000 - $135,000',
    notes: 'Strong focus on design systems and accessible product experiences.',
    interviewLog: [
      {
        date: 'Sep 10, 2026',
        type: 'Technical interview',
        notes: 'Discussed component architecture and testing strategy.',
      },
      {
        date: 'Sep 8, 2026',
        type: 'Recruiter screen',
        notes: 'Reviewed experience, salary expectations, and availability.',
      },
      {
        date: 'Sep 12, 2026',
        type: 'Team interview',
        notes: 'Met two frontend engineers and talked through a past project.',
      },
    ],
    hiringContacts: [
      { name: 'Alex Morgan', role: 'Engineering Manager', email: 'alex.morgan@company1.example' },
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
    company: 'Company 2',
    position: 'Product Designer',
    dateApplied: 'Sep 2, 2026',
    status: 'Applied',
    statusClass:
      'font-medium w-auto rounded-full bg-blue-100 py-1.5 text-center text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 dark:border dark:border-blue-800/40',
    url: 'https://company2.example/careers/product-designer',
    salaryRange: '$95,000 - $120,000',
    notes: 'Portfolio should highlight research-led product improvements.',
    interviewLog: [],
    hiringContacts: [
      { name: 'Sam Taylor', role: 'Talent Partner', email: 'sam.taylor@company2.example' },
    ],
    processTimeline: [
      { label: 'Application submitted', date: 'Sep 2, 2026', completed: true },
      { label: 'Recruiter screen', date: 'Not scheduled', completed: false },
      { label: 'Portfolio review', date: 'Not scheduled', completed: false },
    ],
  },
  {
    id: 3,
    company: 'Company 3',
    position: 'Software Engineer',
    dateApplied: 'Aug 29, 2026',
    status: 'Offer',
    statusClass:
      'font-medium w-auto rounded-full bg-green-100 py-1.5 text-center text-green-700 dark:bg-green-950/50 dark:text-green-400 dark:border dark:border-green-800/40',
    url: 'https://company3.example/jobs/software-engineer',
    salaryRange: '$125,000 - $150,000',
    notes: 'Offer received. Compare equity and remote-work terms before responding.',
    interviewLog: [
      {
        date: 'Sep 6, 2026',
        type: 'Final interview',
        notes: 'Met the platform team and discussed the first 90 days.',
      },
    ],
    hiringContacts: [
      { name: 'Jordan Lee', role: 'Recruiter', email: 'jordan.lee@company3.example' },
      {
        name: 'Robin Patel',
        role: 'Director of Engineering',
        email: 'robin.patel@company3.example',
      },
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
    company: 'Company 4',
    position: 'Backend Developer',
    dateApplied: 'Aug 24, 2026',
    status: 'Rejected',
    statusClass:
      'font-medium w-auto rounded-full bg-red-100 py-1.5 text-center text-red-700 dark:bg-red-950/50 dark:text-red-400 dark:border dark:border-red-800/40',
    url: 'https://company4.example/careers/backend-developer',
    salaryRange: '$105,000 - $128,000',
    notes: 'Role was closed after the first interview round.',
    interviewLog: [
      {
        date: 'Aug 28, 2026',
        type: 'Recruiter screen',
        notes: 'Reviewed backend experience and availability.',
      },
    ],
    hiringContacts: [
      { name: 'Casey Smith', role: 'Recruiter', email: 'casey.smith@company4.example' },
    ],
    processTimeline: [
      { label: 'Application submitted', date: 'Aug 24, 2026', completed: true },
      { label: 'Recruiter screen', date: 'Aug 28, 2026', completed: true },
      { label: 'Application closed', date: 'Sep 3, 2026', completed: true },
    ],
  },
];
