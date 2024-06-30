import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatter',
  standalone: true,
})
export class TimeFormatterPipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value % 60;
    const minutesStr: string =
      minutes < 10 ? '0' + minutes : minutes.toString();
    const secondsStr: string =
      seconds < 10 ? '0' + seconds : seconds.toString();
    return minutesStr + ':' + secondsStr;
  }
}
