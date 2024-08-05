import { Component, OnInit } from '@angular/core';
import { TotalTimeComponent } from './total-time/total-time.component';
import { SetTimersComponent } from './set-timers/set-timers.component';
import { VolumeSliderComponent } from './volume-slider/volume-slider.component';
import { MusicSelectorComponent } from './music-selector/music-selector.component';
import { SfPlaylistComponent } from "./sf-playlist/sf-playlist.component";
import { CommonModule } from '@angular/common';
import { ShareDataService } from '../share-data.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    SetTimersComponent,
    VolumeSliderComponent,
    MusicSelectorComponent,
    TotalTimeComponent,
    SfPlaylistComponent
],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit{
  constructor(private sharedService: ShareDataService){
  }
  sfSelected: boolean = false;

 
  ngOnInit() {
    this.sharedService.currentSound.subscribe((sound: string) => {
      this.sfSelected = sound === 'spotify'
    });
  }
  
}
