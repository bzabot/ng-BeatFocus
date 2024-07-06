import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../share-data.service';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-total-time',
  standalone: true,
  imports: [],
  templateUrl: './total-time.component.html',
  styleUrl: './total-time.component.css',
})
export class TotalTimeComponent implements OnInit {
  private today: string = new Date().toISOString().slice(0, 10);
  private totalTimeStudiedInit = this.localStorageService.getItem(this.today);
  totalTimeStudied: number = this.totalTimeStudiedInit;
  constructor(
    private sharedService: ShareDataService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.sharedService.currentTimeStudied.subscribe((data: number) => {
      this.totalTimeStudied = Math.round(data / 60);
    });
  }
}
