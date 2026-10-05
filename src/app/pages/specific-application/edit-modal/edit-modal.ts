import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Application, ApplicationStatus } from '../../../models/application.model';
import { ApplicationService } from '../../../services/applicationService';

@Component({
  selector: 'app-edit-modal',
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
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Edit Application</h2>
          <button
            type="button"
            (click)="closed.emit()"
            class="cursor-pointer text-lg font-bold text-gray-400 hover:text-gray-600 dark:hover:text-neutral-200"
          >
            ✕
          </button>
        </div>

        <form [formGroup]="editForm" (ngSubmit)="save()" class="mt-4 space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300">
              Company Name
            </label>
            <input
              type="text"
              formControlName="company"
              class="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-[#141414] dark:text-white"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300">
              Position
            </label>
            <input
              type="text"
              formControlName="position"
              class="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-[#141414] dark:text-white"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300">
              Status
            </label>
            <select
              formControlName="status"
              class="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-[#141414] dark:text-white"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300">
              Salary Range
            </label>
            <input
              type="text"
              formControlName="salaryRange"
              class="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-[#141414] dark:text-white"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300">
              Job URL
            </label>
            <input
              type="url"
              formControlName="url"
              class="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-[#141414] dark:text-white"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300">
              Date Applied
            </label>
            <input
              type="text"
              formControlName="dateApplied"
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
              [disabled]="editForm.invalid"
              class="cursor-pointer rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class EditModal {
  readonly application = input.required<Application>();
  readonly closed = output<void>();

  private fb = inject(FormBuilder);
  private appService = inject(ApplicationService);

  editForm = this.fb.group({
    company: ['', Validators.required],
    position: ['', Validators.required],
    status: ['Applied' as ApplicationStatus, Validators.required],
    salaryRange: [''],
    url: [''],
    dateApplied: [''],
  });

  constructor() {
    effect(() => {
      const app = this.application();
      this.editForm.patchValue({
        company: app.company,
        position: app.position,
        status: app.status,
        salaryRange: app.salaryRange,
        url: app.url,
        dateApplied: app.dateApplied,
      });
    });
  }

  async save(): Promise<void> {
    if (this.editForm.valid) {
      const val = this.editForm.value;
      await this.appService.updateApplication(this.application().id, {
        company: val.company!,
        position: val.position!,
        status: val.status as ApplicationStatus,
        salaryRange: val.salaryRange || '',
        url: val.url || '',
        dateApplied: val.dateApplied || '',
      });
      this.closed.emit();
    }
  }
}
