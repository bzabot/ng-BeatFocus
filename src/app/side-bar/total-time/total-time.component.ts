import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../share-data.service';

@Component({
  selector: 'app-total-time',
  standalone: true,
  imports: [],
  templateUrl: './total-time.component.html',
  styleUrl: './total-time.component.css',
})
export class TotalTimeComponent implements OnInit {
  totalTimeStudied: number = 0;
  constructor(private sharedService: ShareDataService) {}
  ngOnInit() {
    this.sharedService.currentTimeStudied.subscribe((data: number) => {
      this.totalTimeStudied = Math.round(data / 60);
    });
  }
}
