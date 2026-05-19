import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Services/auth.service';
import { NgForm } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../../../Services/loading.service';

@Component({
  selector: 'app-send-code',
  templateUrl: './send-code.component.html',
  styleUrl: './send-code.component.css',
  animations: [
    trigger('slideInOutCode', [
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
export class SendCodeComponent {
  email: string='';
  code: string='';
  errorMessage: string='';
  alert: boolean = false;
  alertResendCode: boolean = false;
  alertResendCodeError: boolean = false;


  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  constructor(private router:Router,private auth:AuthService,private loadingService: LoadingService
  ){
    if (this.isLocalStorageAvailable) {
    this.email = localStorage.getItem('resetEmail') || ''; // Retrieve email from localStorage
    if (!this.email) {
      this.errorMessage = 'Email not found in local storage. Please request password reset again.';
    }
  }

  }

  showphone(){
this.router.navigate(['/EnterPhone'])
  }
  showemail(){
    this.router.navigate(['/EnterEmail'])
  }

  showcode(){
    this.router.navigate(['/SendCode'])
  }
  resendCode() {
    if (this.email) {
      this.loadingService.showProgressBar();
      this.auth.requestResetPassword(this.email).subscribe({
        next: () => {
          this.loadingService.hideProgressBar();
          console.log('Code resent');
          this.alertResendCode = !this.alertResendCode;
          setTimeout(() => {
            this.alertResendCode = false;
          }, 1500);
        },
        error: (err) => {
          this.loadingService.hideProgressBar();

          console.log(err.message);
          this.alertResendCodeError = !this.alertResendCodeError;
          setTimeout(() => {
            this.alertResendCodeError = false;
          }, 1500);
        },
      });
    }
  }
onSubmit(form:NgForm){
  if (form.valid) {
    this.loadingService.showProgressBar();
this.auth.sendOtp(this.email,this.code).subscribe({
  next: (res) => {
    console.log(res);
    localStorage.setItem('resetOTP', res); // Store email in localStorage
    this.loadingService.hideProgressBar();
    this.alert=false;
    form.reset();
    setTimeout(() => {
      this.router.navigate(['/ChangePassword']);
    }, 1100);
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
      this.alert = !this.alert;
      setTimeout(() => {
        this.alert = false;

      }, 1500);
    }

  },
})
}
}
}
