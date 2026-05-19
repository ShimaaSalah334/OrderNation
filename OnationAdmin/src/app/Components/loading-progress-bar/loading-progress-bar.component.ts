import { Component, OnDestroy } from '@angular/core';
import { LoadingServiceService } from '../../Services/loading-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading-progress-bar',
  templateUrl: './loading-progress-bar.component.html',
  styleUrl: './loading-progress-bar.component.css'
})
export class LoadingProgressBarComponent implements OnDestroy{
  isLoading: boolean = false;
  progressValue: number = 0;
  private loadingSubscription: Subscription;
  constructor(
    private loadingService: LoadingServiceService
  ) {
    this.loadingSubscription = this.loadingService.LoadingProgressBar$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
