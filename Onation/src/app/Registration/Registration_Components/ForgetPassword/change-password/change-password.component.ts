import { Component, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../../../Services/auth.service';
import { NgForm } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../../../Services/loading.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
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
export class ChangePasswordComponent  {
  password: string = '';
  passwordVisible: boolean = false;
  confirmpassword: string = '';
 cofirmpasswordVisible:boolean = false;errorMessage: string='';
;
eyeImage!: HTMLImageElement;
alert:boolean=false;
alertError:boolean=false;
email: string='';
  code: string='';
  newPassword:string='';
  confirmPassword:string=''
  isLoading: boolean = false;
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';


  constructor(private router:Router,private auth:AuthService,private loadingService: LoadingService){
    if (this.isLocalStorageAvailable) {
      this.email = localStorage.getItem('resetEmail') || '';
      this.code = localStorage.getItem('resetOTP') || '';
      if (!this.email && !this.code) {
        this.errorMessage = 'Email not found in local storage. Please request password reset again.';
      }
  }

}


 PasswordVisibility() {
  if( this.passwordVisible = !this.passwordVisible){
    this.eyeImage = document.getElementById("newpass-icon") as HTMLImageElement;
   this.eyeImage.src = "assets/view.png" ;
    }else{
      this.eyeImage.src = "assets/hide.png" ;
    }
  }

  confirmPasswordVisibility(){
  if(this.cofirmpasswordVisible= !this.cofirmpasswordVisible){
    this.eyeImage = document.getElementById("confirmpass-icon") as HTMLImageElement;
  this.eyeImage.src = "assets/view.png" ;
   }else{
     this.eyeImage.src = "assets/hide.png" ;
   }

  }

onSubmit(form:NgForm){
  if (form.valid) {
    this.loadingService.showProgressBar();
this.auth.resetPassword(this.email,this.code,this.newPassword,this.confirmPassword).subscribe({
  next: (res) => {
    console.log(res);
    form.reset();
    this.loadingService.hideProgressBar();
    this.alert=!this.alert
    setTimeout(() => {
      this.router.navigate(['/SignUp-Login']);
    }, 1500);

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
      this.alertError=!this.alertError
    form.reset()
    setTimeout(() => {
      this.alertError=false
    }, 1800);
    }

  },
})
}
}
}
