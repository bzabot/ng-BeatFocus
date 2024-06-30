import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimerData } from '../timer-data.interface';

@Injectable({
  providedIn: 'root',
})
export class CronometerService {
  private interval: ReturnType<typeof setInterval> | null = null;
  private totalSecondsSubject = new BehaviorSubject<number>(0);
  totalSeconds$: Observable<number> = this.totalSecondsSubject.asObservable();

  private isWorkTime = true;
  private isPaused = true;
  private focusTime: number = 15 * 60;
  private breakTime: number = 5 * 60;

  setTime(data: TimerData) {
    if (data.focusTime > 0) {
      this.focusTime = data.focusTime * 60;
    }
    if (data.breakTime > 0) {
      this.breakTime = data.breakTime * 60;
    }

    this.totalSecondsSubject.next(
      this.isWorkTime ? this.focusTime : this.breakTime
    );
  }

  toggleCronometer() {
    if (this.isPaused) {
      this.startCronometer();
    } else {
      this.stopCronometer();
    }
    this.isPaused = !this.isPaused;
  }

  private switchModes() {
    this.isWorkTime = !this.isWorkTime;
    this.stopCronometer();
    this.totalSecondsSubject.next(
      this.isWorkTime ? this.focusTime : this.breakTime
    );
    this.startCronometer();
  }

  private startCronometer() {
    this.interval = setInterval(() => {
      let currentSeconds = this.totalSecondsSubject.getValue();
      currentSeconds--;

      if (currentSeconds < 0) {
        this.switchModes();
      } else {
        this.totalSecondsSubject.next(currentSeconds);
      }
    }, 1000);
  }

  private stopCronometer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
