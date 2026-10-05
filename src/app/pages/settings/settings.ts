import { Component, inject } from '@angular/core';
import { Tile } from '../../layout/tile/tile';
import { ThemeService, ThemeMode } from '../../services/themeService';

@Component({
  selector: 'app-settings',
  imports: [Tile],
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export class Settings {
  private readonly themeService = inject(ThemeService);

  get selectedTheme(): ThemeMode {
    return this.themeService.theme();
  }

  selectTheme(theme: ThemeMode): void {
    this.themeService.setTheme(theme);
  }
}
