import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { IUserLogin } from '../../../Models/iuser-login';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ViewportScroller } from '@angular/common';
import { style } from '@angular/animations';
import { LoadingService } from '../../../Services/loading.service';
import { Subscription, throwError } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.component.html',
  styleUrl: './signup-login.component.css'
})
export class SignupLoginComponent implements OnInit,OnDestroy {
signUpForm:FormGroup;
logInForm:FormGroup;
errorMessage: string ='';
  horizontalPosition: MatSnackBarHorizontalPosition | undefined;
  verticalPosition: MatSnackBarVerticalPosition | undefined;

  constructor(private formbuilder:FormBuilder , private router:Router, private auth:AuthService,
    private snackbar:MatSnackBar, public loadingService: LoadingService
  ){
    this.signUpForm=this.formbuilder.group({
      userName:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_]+$')]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]],
      passwordConfirmed:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      phoneNumber:['',[Validators.required,Validators.pattern('^[0-9]{11}$')]],
    });

    this.logInForm=formbuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required],


    })

  }
  ngOnDestroy(){

  }

  ngOnInit(): void {
    this.signUpForm.valueChanges.subscribe(() => {
      // Clear the error message when the username is valid
      this.errorMessage = '';
    });
  }
isActive:boolean=true;
toggleClass() {
  this.isActive = !this.isActive;
}
showhome(){
  this.router.navigate(['/Countries'])
}

get UserName(){
  return this.signUpForm.get('userName')
}
get Password(){
  return this.signUpForm.get('password')
}
get ConfirmPassword(){
  return this.signUpForm.get('passwordConfirmed')
}
get Email(){
  return this.signUpForm.get('email')
}
get Phone(){
  return this.signUpForm.get('phoneNumber')
}

get LoginUserName(){
  return this.logInForm.get('userName')
}
get LoginPassword(){
  return this.logInForm.get('password')
}


onLogin(){
  this.loadingService.showProgressBar();
  let userModel:IUserLogin=this.logInForm.value as IUserLogin;
    this.auth.logIn(userModel).subscribe({
      next:()=>{
        this.loadingService.hideProgressBar();
        this.router.navigate(['/Countries'])
      },
      error:(err)=>{
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
          this.snackbar.open('اسم المستخدم أو كلمة المرور غير صحيحة', 'إغلاق', {
            duration: 5000,
            horizontalPosition: 'start',
            verticalPosition: 'top',
            panelClass: ['rtl-snackbar', 'custom-snackbar']  // Apply multiple classes


          });        }

        console.log(err.message)

      }
    })

}


onSignUp(){
  this.loadingService.showProgressBar();
  let userModel:IUserLogin=this.signUpForm.value as IUserLogin;

    // console.log(this.logInForm.value)
    this.auth.signUp(userModel).subscribe({
      next:()=>{
        this.loadingService.hideProgressBar();
        this.openSuccessSnackBar();
        this.signUpForm.reset();
      },
      error:(err)=>{
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
          this.errorMessage = 'عذرًا، اسم المستخدم هذا موجود بالفعل. الرجاء اختيار اسم مستخدم مختلف';

        }
        console.log(err.message)
      }
    })
    console.log(this.signUpForm.value)

}
openSuccessSnackBar() {
  this.snackbar.open('تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.', 'إغلاق', {
    duration: 5000,
    horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['rtl-snackbar', 'custom-snackbar']  // Apply multiple classes


  });

}
}
