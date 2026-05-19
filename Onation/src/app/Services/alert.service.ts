import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  private alertSubject = new Subject<string>();
  alert$ = this.alertSubject.asObservable();
  private alertErrorSubject = new Subject<string>();
  alertError$ = this.alertErrorSubject.asObservable();

  showAlert(message: string) {
    this.alertSubject.next(message);
  }
  showAlertError(errorMessage: string) {
    this.alertErrorSubject.next(errorMessage);
  }
}
