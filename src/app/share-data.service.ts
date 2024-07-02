import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimerData } from './timer-data.interface';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  private timeDataSource = new BehaviorSubject<TimerData>({
    focusTime: 25,
    breakTime: 5,
  });
  currentTimeData = this.timeDataSource.asObservable();

  private volumeData = new BehaviorSubject<number>(50);
  currentVolume = this.volumeData.asObservable();

  private soundData = new BehaviorSubject<string>('Binaural');
  currentSound = this.soundData.asObservable();

  constructor() {}

  changeTimerData(data: TimerData) {
    this.timeDataSource.next(data);
  }

  changeVolume(volume: number) {
    this.volumeData.next(volume);
  }

  changeSound(sound: string) {
    this.soundData.next(sound);
  }
}
