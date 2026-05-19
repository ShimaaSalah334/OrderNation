import { Component } from '@angular/core';
import { AlertService } from '../../Services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  message: string | null = null;
  errorMessage: string | null = null;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alert$.subscribe((message) => {
      this.message = message;
      setTimeout(() => this.message = null, 3000);  // Hide alert after 3 seconds
    });
    this.alertService.alertError$.subscribe((errorMessage) => {
      this.errorMessage = errorMessage;
      setTimeout(() => this.errorMessage = null, 3000);  // Hide alert after 3 seconds
    });
  }
}
