import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sf-playlist',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sf-playlist.component.html',
  styleUrl: './sf-playlist.component.css'
})
export class SfPlaylistComponent {

  onSubmit(myForm: string){
    console.log('sf playlist submited')
    console.log(myForm)
  }
}
