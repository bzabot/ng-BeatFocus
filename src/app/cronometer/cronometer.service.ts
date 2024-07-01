import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimerData } from '../timer-data.interface';
import { AudioService } from './audio.service';

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

  constructor(private audioService: AudioService) {}

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
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      this.handleAudioPlayback();
      this.startCronometer();
    } else {
      this.stopCronometer();
    }
  }

  private switchModes() {
    this.isWorkTime = !this.isWorkTime;
    this.stopCronometer();
    this.totalSecondsSubject.next(
      this.isWorkTime ? this.focusTime : this.breakTime
    );
    this.handleAudioPlayback();
    console.log('start');
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
    this.audioService.stopAudio();
  }

  setVolume(volume: number) {
    this.audioService.setVolume(volume / 100);
  }

  private handleAudioPlayback() {
    console.log(this.isWorkTime);
    console.log(this.isPaused);
    if (this.isWorkTime && !this.isPaused) {
      this.audioService.playAudio('binaural.mp3'); // still need to change this
      console.log('play audio');
    } else {
      this.audioService.stopAudio();
    }
  }
}
