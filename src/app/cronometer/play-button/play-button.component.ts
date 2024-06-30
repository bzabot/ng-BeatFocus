import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.css',
})
export class PlayButtonComponent {
  status = false;

  @Output() onButtonClick: EventEmitter<void> = new EventEmitter();

  clickBtn() {
    this.status = !this.status;
    this.onButtonClick.emit();
  }
}
