import { Component } from '@angular/core';
import { Tile } from '../../layout/tile/tile';

@Component({
  imports: [Tile],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {}
