import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAdmin } from '../../Models/iadmin';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { LoadingServiceService } from '../../Services/loading-service.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { showHideSettingsAnimation } from '../../app.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    showHideSettingsAnimation,
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
export class LoginComponent {
  logInForm:FormGroup;
  alertLoginError:boolean=false;

  constructor(private formbuilder:FormBuilder,private auth:AuthService,
    private router:Router,
    private loadingService:LoadingServiceService
  ){
    this.logInForm=this.formbuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required],


    })

  }

  get LoginUserName(){
    return this.logInForm.get('userName')
  }
  get LoginPassword(){
    return this.logInForm.get('password')
  }
  onSubmit(){
    this.loadingService.showProgressBar();
    let userModel:IAdmin=this.logInForm.value as IAdmin;
    this.auth.logIn(userModel).subscribe({
      next:(res)=>{
        this.loadingService.hideProgressBar();
       console.log(res)
       this.router.navigate(['/AdminAutherization'])
      },
      error:(err)=>{
        this.loadingService.hideProgressBar();
        console.log(err.message)
this.alertLoginError=!this.alertLoginError
setTimeout(() => {
  this.alertLoginError = false;
}, 2000);
      }
  })

}
}
