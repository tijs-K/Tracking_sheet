import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /**
   * The currently active theme mode ('light', 'dark', or 'system')
   */
  readonly theme = signal<ThemeMode>('system');

  constructor() {
    if (this.isBrowser) {
      // Restore previously saved preference from localStorage
      const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
      if (
        savedTheme &&
        (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')
      ) {
        this.theme.set(savedTheme);
      }

      this.applyTheme(this.theme());

      // Listen for OS color scheme changes in real-time when in system mode
      if (typeof window.matchMedia === 'function') {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          if (this.theme() === 'system') {
            document.documentElement.classList.toggle('dark', e.matches);
          }
        });
      }
    }
  }

  /**
   * Set theme preference and persist to localStorage
   */
  setTheme(mode: ThemeMode): void {
    this.theme.set(mode);
    if (this.isBrowser) {
      localStorage.setItem('theme', mode);
      this.applyTheme(mode);
    }
  }

  /**
   * Apply or remove the 'dark' class on document.documentElement
   */
  private applyTheme(mode: ThemeMode): void {
    if (!this.isBrowser) return;

    const prefersDark =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = mode === 'dark' || (mode === 'system' && prefersDark);

    document.documentElement.classList.toggle('dark', isDark);
  }
}
