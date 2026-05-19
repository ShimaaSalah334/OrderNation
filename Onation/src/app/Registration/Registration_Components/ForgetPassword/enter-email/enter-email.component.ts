import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../../../Services/alert.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../../../Services/loading.service';

@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrl: './enter-email.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class EnterEmailComponent   {
  email: string = '';
  alert: boolean = false;
  alertError: boolean = false;
  step: 'request' | 'verify' = 'request'; // Track the current step

  constructor(
    private router: Router,
    private auth: AuthService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {

  }

  showphone() {
    this.router.navigate(['/EnterPhone']);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.loadingService.showProgressBar();
    this.auth.requestResetPassword(this.email).subscribe({
      next: () => {
        console.log('code sent');
        localStorage.setItem('resetEmail', this.email); // Store email in localStorage
        this.loadingService.hideProgressBar();
        form.reset();
        this.alert = !this.alert;
        setTimeout(() => {
          this.router.navigate(['/SendCode']);
        }, 1000);

      },
      error: (err) => {
        console.log(err.message);
        this.loadingService.hideProgressBar();
        if (err.status === 0) {
          this.router.navigate(['/NetworkError'])
          console.error('An error occurred:', err.error);

        } else if (err.status === 500) {
          this.router.navigate(['/ServerError'])
          console.error('Backend returned code 500, body was:', err.error);
        } else if (err.status === 403 || err.status === 401) {
          console.error('CORS error or unauthorized access:', err.error);
        } else {
          console.error(`Backend returned code ${err.status}, body was:`, err.error);
          form.reset();
          this.alertError = !this.alertError;
          setTimeout(() => {
            this.alertError = false

          }, 1500);
        }


      },
    });
  }
}
}
