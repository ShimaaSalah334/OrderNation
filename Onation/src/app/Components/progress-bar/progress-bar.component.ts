import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../Services/loading.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent implements OnDestroy {
  isLoading: boolean = false;
  progressValue: number = 0;
  private loadingSubscription: Subscription;
  constructor(
    private loadingService: LoadingService
  ) {
    this.loadingSubscription = this.loadingService.LoadingProgressBar$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
