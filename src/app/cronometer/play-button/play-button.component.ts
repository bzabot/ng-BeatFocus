import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.css',
})
export class PlayButtonComponent {
  status = false;
  clickBtn() {
    this.status = !this.status;
  }
}
