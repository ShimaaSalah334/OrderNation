import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private isLoadingProgressBarSubject = new BehaviorSubject<boolean>(false);
  LoadingProgressBar$ = this.isLoadingProgressBarSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();


  constructor() { }

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }

  showProgressBar() {
    this.isLoadingProgressBarSubject.next(true);
  }

  hideProgressBar() {
    this.isLoadingProgressBarSubject.next(false);
  }
}
