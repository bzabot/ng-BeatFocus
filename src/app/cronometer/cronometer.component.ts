import { Component } from '@angular/core';
import { PlayButtonComponent } from './play-button/play-button.component';

@Component({
  selector: 'app-cronometer',
  standalone: true,
  imports: [PlayButtonComponent],
  templateUrl: './cronometer.component.html',
  styleUrl: './cronometer.component.css',
})
export class CronometerComponent {}
