import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimerData } from './timer-data.interface';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  private dataSource = new BehaviorSubject<TimerData>({
    focusTime: 25,
    breakTime: 5,
  });
  currentData = this.dataSource.asObservable();

  constructor() {}

  changeData(data: TimerData) {
    this.dataSource.next(data);
  }
}
