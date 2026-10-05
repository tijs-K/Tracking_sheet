import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationService } from '../../../services/applicationService';

@Component({
  selector: 'app-log-activity-modal',
  imports: [ReactiveFormsModule],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
    >
      <div
        class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:border dark:border-neutral-800 dark:bg-[#1C1C1C]"
      >
        <div
          class="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-neutral-800"
        >
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Log Activity</h2>
          <button
            type="button"
            (click)="closed.emit()"
            class="cursor-pointer text-lg font-bold text-gray-400 hover:text-gray-600 dark:hover:text-neutral-200"
          >
            ✕
          </button>
        </div>

        <!-- Activity Type Tabs -->
        <div class="mt-4 flex rounded-xl bg-gray-100 p-1 dark:bg-neutral-900">
          <button
            type="button"
            (click)="activityTab.set('interview')"
            [class.bg-white]="activityTab() === 'interview'"
            [class.shadow-xs]="activityTab() === 'interview'"
            [class.dark:bg-[#252525]]="activityTab() === 'interview'"
            [class.dark:text-white]="activityTab() === 'interview'"
            class="flex-1 cursor-pointer rounded-lg py-1.5 text-xs font-medium text-gray-700 transition dark:text-neutral-300"
          >
            🎤 Interview
          </button>
          <button
            type="button"
            (click)="activityTab.set('contact')"
            [class.bg-white]="activityTab() === 'contact'"
            [class.shadow-xs]="activityTab() === 'contact'"
            [class.dark:bg-[#252525]]="activityTab() === 'contact'"
            [class.dark:text-white]="activityTab() === 'contact'"
            class="flex-1 cursor-pointer rounded-lg py-1.5 text-xs font-medium text-gray-700 transition dark:text-neutral-300"
          >
            👤 Contact
          </button>
          <button
            type="button"
            (click)="activityTab.set('timeline')"
            [class.bg-white]="activityTab() === 'timeline'"
            [class.shadow-xs]="activityTab() === 'timeline'"
            [class.dark:bg-[#252525]]="activityTab() === 'timeline'"
            [class.dark:text-white]="activityTab() === 'timeline'"
            class="flex-1 cursor-pointer rounded-lg py-1.5 text-xs font-medium text-gray-700 transition dark:text-neutral-300"
          >
            ⏱️ Timeline Step
          </button>
        </div>

        <!-- Tab 1: Interview Log Form -->
        @if (activityTab() === 'interview') {
          <form [formGroup]="interviewForm" (ngSubmit)="saveInterview()" class="mt-4 space-y-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300"
                >Interview Type / Round</label
              >
              <input
                type="text"
                formControlName="type"
                placeholder="e.g. Technical Screen, Onsite, Final Round"
                class="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-[#141414] dark:text-white"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300"
                >Date</label
              >
              <input
                type="text"
                formControlName="date"
                placeholder="e.g. Oct 12, 2026"
                class="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-[#141414] dark:text-white"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300"
                >Notes / Feedback</label
              >
              <textarea
                formControlName="notes"
                rows="3"
                placeholder="What was discussed? Questions asked?"
                class="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-[#141414] dark:text-white"
              ></textarea>
            </div>
            <div class="mt-6 flex justify-end gap-3 pt-2">
              <button
                type="button"
                (click)="closed.emit()"
                class="cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                [disabled]="interviewForm.invalid"
                class="cursor-pointer rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Save Interview Log
              </button>
            </div>
          </form>
        }

        <!-- Tab 2: Hiring Contact Form -->
        @if (activityTab() === 'contact') {
          <form [formGroup]="contactForm" (ngSubmit)="saveContact()" class="mt-4 space-y-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300"
                >Contact Name</label
              >
              <input
                type="text"
                formControlName="name"
                placeholder="e.g. Jane Doe"
                class="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-[#141414] dark:text-white"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300"
                >Role / Title</label
              >
              <input
                type="text"
                formControlName="role"
                placeholder="e.g. Senior Recruiter, Engineering Manager"
                class="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-[#141414] dark:text-white"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300"
                >Email Address</label
              >
              <input
                type="email"
                formControlName="email"
                placeholder="jane.doe@company.com"
                class="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-[#141414] dark:text-white"
              />
            </div>
            <div class="mt-6 flex justify-end gap-3 pt-2">
              <button
                type="button"
                (click)="closed.emit()"
                class="cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                [disabled]="contactForm.invalid"
                class="cursor-pointer rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Add Contact
              </button>
            </div>
          </form>
        }

        <!-- Tab 3: Timeline Event Form -->
        @if (activityTab() === 'timeline') {
          <form [formGroup]="timelineForm" (ngSubmit)="saveTimeline()" class="mt-4 space-y-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300"
                >Milestone / Step Label</label
              >
              <input
                type="text"
                formControlName="label"
                placeholder="e.g. Technical Interview, Offer Received"
                class="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-[#141414] dark:text-white"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300"
                >Date</label
              >
              <input
                type="text"
                formControlName="date"
                placeholder="e.g. Oct 15, 2026 or Next step"
                class="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-[#141414] dark:text-white"
              />
            </div>
            <div class="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="modal-completed"
                formControlName="completed"
                class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-700 dark:bg-[#141414]"
              />
              <label for="modal-completed" class="text-sm text-gray-700 dark:text-neutral-300"
                >Completed</label
              >
            </div>
            <div class="mt-6 flex justify-end gap-3 pt-2">
              <button
                type="button"
                (click)="closed.emit()"
                class="cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                [disabled]="timelineForm.invalid"
                class="cursor-pointer rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Add Timeline Step
              </button>
            </div>
          </form>
        }
      </div>
    </div>
  `,
})
export class LogActivityModal {
  readonly applicationId = input.required<number>();
  readonly closed = output<void>();

  private fb = inject(FormBuilder);
  private appService = inject(ApplicationService);

  readonly activityTab = signal<'interview' | 'contact' | 'timeline'>('interview');

  interviewForm = this.fb.group({
    date: ['Today', Validators.required],
    type: ['Technical Interview', Validators.required],
    notes: [''],
  });

  contactForm = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
    email: [''],
  });

  timelineForm = this.fb.group({
    label: ['', Validators.required],
    date: ['Today', Validators.required],
    completed: [false],
  });

  async saveInterview(): Promise<void> {
    if (this.interviewForm.valid) {
      const val = this.interviewForm.value;
      await this.appService.addInterviewLog(this.applicationId(), {
        date: val.date || 'Today',
        type: val.type || 'Interview',
        notes: val.notes || '',
      });
      this.closed.emit();
    }
  }

  async saveContact(): Promise<void> {
    if (this.contactForm.valid) {
      const val = this.contactForm.value;
      await this.appService.addHiringContact(this.applicationId(), {
        name: val.name!,
        role: val.role || 'Recruiter',
        email: val.email || '',
      });
      this.closed.emit();
    }
  }

  async saveTimeline(): Promise<void> {
    if (this.timelineForm.valid) {
      const val = this.timelineForm.value;
      await this.appService.addTimelineEvent(this.applicationId(), {
        label: val.label!,
        date: val.date || 'Today',
        completed: Boolean(val.completed),
      });
      this.closed.emit();
    }
  }
}
