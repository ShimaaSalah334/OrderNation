import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  public lang = 'ar';
  constructor () {
    if (this.isLocalStorageAvailable) {//code here}
      this.lang = localStorage['lang'] || 'ar';

      }
  }

}
