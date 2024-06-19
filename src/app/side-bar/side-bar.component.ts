import { Component } from '@angular/core';
import { TotalTimeComponent } from './total-time/total-time.component';
import { SetTimersComponent } from './set-timers/set-timers.component';
import { VolumeSliderComponent } from './volume-slider/volume-slider.component';
import { MusicSelectorComponent } from './music-selector/music-selector.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    SetTimersComponent,
    VolumeSliderComponent,
    MusicSelectorComponent,
    TotalTimeComponent,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {}
