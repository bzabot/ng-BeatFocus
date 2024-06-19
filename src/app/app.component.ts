import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CronometerComponent } from './cronometer/cronometer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSidenavModule, SideBarComponent, CronometerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'BeatFocus';
}
