import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio = new Audio();
  private alarm = new Audio('alarm.wav');
  audioType: string = 'binaural';
  private audioFolder: string | null = '';
  private audioFiles: string[] | null = [''];

  private lofiFolder: string = 'lofi/';
  private lofiArray: string[] = [
    'Above The Quiet City.mp3',
    'Abysses.mp3',
    'Affection.mp3',
    'As Days Go By.mp3',
    'be.mp3',
    'Bitterness And Secrecy.mp3',
    'Bluegrass.mp3',
    'Bright Lights.mp3',
    'Charms.mp3',
    'Coming Home.mp3',
    'Down The Port.mp3',
    'Feathers.mp3',
    'Flow.mp3',
    'Isolation.mp3',
    'Koshi.mp3',
    'late summit.mp3',
    "Life's Short.mp3",
    'Lockdown.mp3',
    'New Light.mp3',
    'Noctilucent.mp3',
    'Nocturnal.mp3',
    'Notes of an Evening.mp3',
    'Old Friend.mp3',
    'Sky Above.mp3',
    'Solstice.mp3',
    'Straying.mp3',
    'Sun Will Rise Again.mp3',
    'Sunrise.mp3',
    "There's Still Time.mp3",
    'Towards The Mountains.mp3',
    'Under A Wishing Sky.mp3',
    'Ventura.mp3',
    'when i close my eyes.mp3',
    'yourcolors.mp3',
  ];
  private binauralFolder: string = 'binaural/';
  private binauralArray: string[] = ['binaural.mp3'];
  private classicalFolder: string = 'classical/';
  private classicalArray: string[] = [
    'classical1.mp3',
    'classical10.mp3',
    'classical11.mp3',
    'classical12.mp3',
    'classical13.mp3',
    'classical14.mp3',
    'classical15.mp3',
    'classical16.mp3',
    'classical17.mp3',
    'classical18.mp3',
    'classical19.mp3',
    'classical2.mp3',
    'classical20.mp3',
    'classical21.mp3',
    'classical22.mp3',
    'classical3.mp3',
    'classical4.mp3',
    'classical5.mp3',
    'classical6.mp3',
    'classical7.mp3',
    'classical8.mp3',
    'classical9.mp3',
  ];

  constructor() {
    this.audio.onended = () => this.onAudioEnded();
    this.alarm.volume = 0.15;
  }
  changeAudio(audioType: string) {
    this.audioType = audioType;
  }

  onAudioEnded() {
    this.playAudio(this.audioType);
  }

  playAudio(audioType: string) {
    this.audioType = audioType;
    switch (this.audioType) {
      case 'lofi':
        this.audioFolder = this.lofiFolder;
        this.audioFiles = this.lofiArray;
        break;
      case 'classical':
        this.audioFolder = this.classicalFolder;
        this.audioFiles = this.classicalArray;
        break;
      case 'Binaural':
        this.audioFolder = this.binauralFolder;
        this.audioFiles = this.binauralArray;
        break;
      case 'binaural':
        this.audioFolder = this.binauralFolder;
        this.audioFiles = this.binauralArray;
        break;
      case 'noSound':
        return;
    }

    const randomIndex = Math.floor(Math.random() * this.audioFiles!.length);
    const chosenAudio = this.audioFiles![randomIndex];
    this.audio.src = this.audioFolder + chosenAudio;

    this.audio.play();
  }

  stopAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
  }

  playAlarm() {
    this.alarm.play();
  }
}
