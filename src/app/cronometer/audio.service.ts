import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio = new Audio();
  private binaural: string = 'binaural.mp3';

  playAudio(url: string) {
    this.audio.src = url;
    this.audio.play();
  }

  stopAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
  }
}
