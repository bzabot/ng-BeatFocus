import { Component, OnInit } from '@angular/core';
import { PlayButtonComponent } from './play-button/play-button.component';
import { TimeFormatterPipe } from './time-formatter.pipe';
import { ShareDataService } from '../share-data.service';
import { TimerData } from '../timer-data.interface';

@Component({
  selector: 'app-cronometer',
  standalone: true,
  templateUrl: './cronometer.component.html',
  styleUrl: './cronometer.component.css',
  imports: [PlayButtonComponent, TimeFormatterPipe],
})
export class CronometerComponent implements OnInit {
  private interval: ReturnType<typeof setInterval> | null = null;

  focusTime: number = 15;
  breakTime: number = 5;
  isWorkTime = true;
  isPaused = true;
  totalSeconds: number = this.focusTime;
  data: TimerData = { focusTime: 25, breakTime: 5 };

  constructor(private sharedService: ShareDataService) {}
  ngOnInit() {
    this.sharedService.currentData.subscribe((data: TimerData) => {
      this.data = data;
      const focusTimeValue = +this.data.focusTime;
      const pauseTimeValue = +this.data.breakTime;

      if (focusTimeValue > 0) {
        this.focusTime = focusTimeValue * 60;
      }
      if (pauseTimeValue > 0) {
        this.breakTime = pauseTimeValue * 60;
      }
      this.totalSeconds = this.isWorkTime ? this.focusTime : this.breakTime;
    });
  }

  toggleCronometer() {
    if (this.isPaused) {
      this.startCronometer();
    } else {
      clearInterval(this.interval as ReturnType<typeof setInterval>);
    }
    this.isPaused = !this.isPaused;
  }

  switchModes() {
    this.isWorkTime = !this.isWorkTime;
    clearInterval(this.interval as ReturnType<typeof setInterval>);
    this.interval = null;
    if (this.isWorkTime) {
      this.totalSeconds = this.focusTime;
      this.startCronometer();
    } else {
      this.totalSeconds = this.breakTime;
      this.startCronometer();
    }
  }

  startCronometer() {
    // console.log('Button clicked');
    this.interval = setInterval(() => {
      this.totalSeconds--;

      if (this.totalSeconds < 0) {
        this.switchModes();
      }
    }, 1000);
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
