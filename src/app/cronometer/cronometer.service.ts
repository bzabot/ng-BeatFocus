import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimerData } from '../timer-data.interface';
import { AudioService } from './audio.service';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CronometerService {
  constructor(
    private audioService: AudioService,
    private localStorageService: LocalStorageService
  ) {}

  private interval: ReturnType<typeof setInterval> | null = null;
  private totalSecondsSubject = new BehaviorSubject<number>(0);
  totalSeconds$: Observable<number> = this.totalSecondsSubject.asObservable();
  private today: string = new Date().toISOString().slice(0, 10);
  private totalTimeStudiedInit = this.localStorageService.getItem(this.today);

  private totalTimeStudiedSubject = new BehaviorSubject<number>(
    this.totalTimeStudiedInit
  );
  totalTimeStudied$: Observable<number> =
    this.totalTimeStudiedSubject.asObservable();

  private isWorkTime = true;
  private isPaused = true;
  private focusTime: number = 25 * 60;
  private breakTime: number = 5 * 60;
  private audioType: string = 'binaural';
  private progressSubject = new BehaviorSubject<number>(0);
  progress$: Observable<number> = this.progressSubject.asObservable();

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
    this.audioService.playAlarm();
    this.stopCronometer();
    this.totalSecondsSubject.next(
      this.isWorkTime ? this.focusTime : this.breakTime
    );

    this.handleAudioPlayback();
    this.startCronometer();
  }

  private getProgress(currentSeconds: number) {
    const progress =
      ((this.isWorkTime ? this.focusTime : this.breakTime) - currentSeconds) /
      (this.isWorkTime ? this.focusTime : this.breakTime);
    this.progressSubject.next(progress * 100);
  }

  private startCronometer() {
    this.interval = setInterval(() => {
      let currentSeconds = this.totalSecondsSubject.getValue();
      currentSeconds--;

      this.getProgress(currentSeconds);

      if (this.isWorkTime) {
        let currentTotalTimeStudied = this.totalTimeStudiedSubject.getValue();
        currentTotalTimeStudied++;
        this.totalTimeStudiedSubject.next(currentTotalTimeStudied);
        this.saveTotalTimeStudied(currentTotalTimeStudied);
      }

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
    if (this.isWorkTime && !this.isPaused) {
      this.audioService.playAudio(this.audioType);
    } else {
      this.audioService.stopAudio();
    }
  }

  setSound(sound: string) {
    this.audioType = sound;
  }

  private saveTotalTimeStudied(totalTimeStudied: number) {
    this.localStorageService.setItem(this.today, totalTimeStudied.toString());
  }
}
