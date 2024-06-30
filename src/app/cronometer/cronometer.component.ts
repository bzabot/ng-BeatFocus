import { Component, OnInit } from '@angular/core';
import { PlayButtonComponent } from './play-button/play-button.component';
import { TimeFormatterPipe } from './time-formatter.pipe';
import { ShareDataService } from '../share-data.service';
import { TimerData } from '../timer-data.interface';
import { CronometerService } from './cronometer.service';

@Component({
  selector: 'app-cronometer',
  standalone: true,
  templateUrl: './cronometer.component.html',
  styleUrl: './cronometer.component.css',
  imports: [PlayButtonComponent, TimeFormatterPipe],
})
export class CronometerComponent implements OnInit {
  totalSeconds: number = 0;
  focusTime: number = 25 * 60;
  breakTime: number = 25 * 60;

  data: TimerData = { focusTime: 25, breakTime: 5 };

  constructor(
    private sharedService: ShareDataService,
    private cronometerService: CronometerService
  ) {}
  ngOnInit() {
    // Handle set timer submit
    this.sharedService.currentTimeData.subscribe((data: TimerData) => {
      this.data = data;
      this.cronometerService.setTime(data);
    });

    this.cronometerService.totalSeconds$.subscribe((seconds) => {
      this.totalSeconds = seconds;
    });

    this.sharedService.currentVolume.subscribe((volume: number) => {
      // Handle volume changes
    });
  }

  toggleCronometer() {
    this.cronometerService.toggleCronometer();
  }
}

// Next features:
/*
- time setter
- play music
- choose music
- change volume
- local storage
*/
