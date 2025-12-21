import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ElectronService } from 'ngx-electron'; // Import ElectronService

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ser-o-no-ser-ng');
  protected readonly year = new Date().getFullYear();

  constructor(private _electronService: ElectronService) {
    console.log('AppComponent constructor called!');
    if (this._electronService.isElectronApp) {
      console.log('Running in Electron!');
      // You can add more Electron-specific interactions here
    } else {
      console.log('Running in browser.');
    }
  }
}
