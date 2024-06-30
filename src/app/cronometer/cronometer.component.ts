import { Component } from '@angular/core';
import { PlayButtonComponent } from './play-button/play-button.component';
import { TimeFormatterPipe } from './time-formatter.pipe';

@Component({
  selector: 'app-cronometer',
  standalone: true,
  templateUrl: './cronometer.component.html',
  styleUrl: './cronometer.component.css',
  imports: [PlayButtonComponent, TimeFormatterPipe],
})
export class CronometerComponent {
  private interval: ReturnType<typeof setInterval> | null = null;
  totalSeconds: number = 15;

  startCronometer() {
    console.log('Button clicked');
    this.interval = setInterval(() => {
      this.totalSeconds--;
      console.log(this.totalSeconds);
      if (this.totalSeconds <= 0) {
        clearInterval(this.interval as ReturnType<typeof setInterval>);
        this.interval = null;
      }
    }, 1000);
  }
}
