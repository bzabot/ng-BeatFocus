import { Component } from '@angular/core';
import { ShareDataService } from '../../share-data.service';

@Component({
  selector: 'app-music-selector',
  standalone: true,
  imports: [],
  templateUrl: './music-selector.component.html',
  styleUrl: './music-selector.component.css',
})
export class MusicSelectorComponent {
  constructor(private sharedService: ShareDataService) {}

  changeSound(sound: string) {
    this.sharedService.changeSound(sound);
  }
}
