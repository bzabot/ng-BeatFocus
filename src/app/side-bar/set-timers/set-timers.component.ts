import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShareDataService } from '../../share-data.service';
import { TimerData } from '../../timer-data.interface';

@Component({
  selector: 'app-set-timers',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './set-timers.component.html',
  styleUrl: './set-timers.component.css',
})
export class SetTimersComponent {
  constructor(private sharedService: ShareDataService) {}

  onSubmit(form: TimerData) {
    this.sharedService.changeData(form);
  }
}
