import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
} from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
export const showHideMenuAnimation = trigger('showHideMenuAnimation', [
  state(
    'show-menu',
    style({
      opacity: 1,
      transform: 'translateX(0)',
    })
  ),
  state(
    'hide-menu',
    style({
      opacity: 0,
      transform: 'translateX(100%)',
    })
  ),
  transition('show-menu => hide-menu', [animate('300ms ease')]),
  transition('hide-menu => show-menu', [animate('300ms ease')]),

  state(
    'show-addsuggestion',
    style({
      opacity: '1',
      visibility: 'visible',
    })
  ),
  state(
    'hide-addsuggestion',
    style({
      opacity: '0',
      visibility: 'hidden',
    })
  ),
  transition('show-addsuggestion => hide-addsuggestion', [animate('300ms ease-in-out')]),
  transition('hide-addsuggestion => show-addsuggestion', [animate('300ms ease-in-out')]),




]);
export const showHideSettingsAnimation= trigger('showHideSettingsAnimation', [
  state('void', style({
    opacity: 0
  })),
  transition('void <=> *', [animate('300ms ease-in-out')]),
]);
export const showHideDiscoverMoreAnimation = trigger('showHideDiscoverMoreAnimation', [
   transition(
          ':enter',
          [
            style({  opacity: 0 }),
            animate('500ms ease-in-out',
                    style({  opacity: 1}))
          ]
        ),
        transition(
          ':leave',
          [
            style({opacity: 1 }),
            animate('300ms ease',
                    style({opacity: 0 }))
          ]
        )


]);
export const favoriteAnimation = trigger('scale', [
  state('small', style({
    transform: 'scale(1)'
  })),
  state('large', style({
    transform: 'scale(0.6)'
  })),
  transition('small <=> large', animate('500ms ease'))
]);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Onation';
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  constructor(private translateService:TranslateService){
    this.translateService.setDefaultLang('ar');
    if (this.isLocalStorageAvailable) {//code here}
    this.translateService.use(localStorage.getItem('lang') || 'ar')
    }
  }
}
