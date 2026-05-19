import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
export const showHideSettingsAnimation= trigger('showHideSettingsAnimation', [
  state('void', style({
    opacity: 0
  })),
  transition('void <=> *', [animate('300ms ease-in-out')]),
]);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'OnationAdmin';
}
