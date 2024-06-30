import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ShareDataService } from '../../share-data.service';

@Component({
  selector: 'app-volume-slider',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
  ],
  templateUrl: './volume-slider.component.html',
  styleUrl: './volume-slider.component.css',
})
export class VolumeSliderComponent {
  constructor(private sharedService: ShareDataService) {}
  volume: number = 50;

  onChangeSlider(event: Event): void {
    // this.sharedService.changeVolume(volume);
    // const value = event.value;
    // console.log('Slider Value Changed:', value);
    const inputElement = event.target as HTMLInputElement;
    this.volume = parseInt(inputElement.value, 10);

    this.sharedService.changeVolume(this.volume);
  }
}
