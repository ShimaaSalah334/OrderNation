import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable, catchError, retry, tap, throwError } from 'rxjs';
import { IUserLogin } from '../Models/iuser-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOption;
private APIURL:string="https://projects.runasp.net/api/Account/";
  constructor(private http:HttpClient,private router:Router) {
    this.httpOption={
      headers:new HttpHeaders({
        'accept': '*/*',
        'Content-Type':'application/json',
        //,Authorization: 'my-auth-token'
      })
    }
  }
   handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.router.navigate(['/NetworkError'])
      console.error('An error occurred:', error.error);
      return throwError(() => new Error('Network error. Please check your connection.'));

    } else if (error.status === 500) {
      this.router.navigate(['/ServerError'])
      console.error('Backend returned code 500, body was:', error.error);
      return throwError(() => new Error('Internal Server Error. Please try again later.'));
    } else if (error.status === 403 || error.status === 401) {
      console.error('CORS error or unauthorized access:', error.error);
      return throwError(() => new Error('Access denied. Please check your permissions.'));
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }
  }

  signUp(userObj: any): Observable<string> {
    return this.http.post(`${this.APIURL}register`, userObj, { ...this.httpOption, responseType: 'text' })

  }
  // signUp(userObj:any){
  //   return this.http.post<any>(`${this.APIURL}register`,userObj,this.httpOption).pipe(
  //     catchError(this.handleError)
  //   )

  // }

  logIn(loginObj:any){
    return this.http.post<any>(`${this.APIURL}login`,loginObj,this.httpOption).pipe(
      tap(response=>{
        if(response && response.token){
          localStorage.setItem('authToken', response.token);
        }
      }),
      retry(3)
    )
  }
  logout():void{
localStorage.removeItem('authToken');
  }
  getToken():string | null{
    return localStorage.getItem('authToken');
  }

  delete():Observable<any> {
    return this.http.delete<any>(`${this.APIURL}delete`,{ ...this.httpOption }).pipe(
      catchError(this.handleError)
    )

  }

  requestResetPassword(email:string):Observable<any>{
    let params = new HttpParams().set('Email', email);
    return this.http.post(`${this.APIURL}ForgotPassword`,{},{params, ...this.httpOption, responseType: 'text' })


  }

sendOtp(email:string,otp:string):Observable<any>{
  return this.http.post(`${this.APIURL}VerityOTP`,{ email, otp},{responseType:'text'})
}
resetPassword(email:string,resetpassowToken:string,newPassword: string,confirmPassword: string):Observable<any>{
return this.http.post(`${this.APIURL}ResetPassword`,{email,resetpassowToken,newPassword,confirmPassword},{responseType:'text'})

}

getCurrUser():Observable<any>{
 return this.http.get<any>(`${this.APIURL}GetCurrentUser`)
}
updateProfile(profileData:any):Observable<any>{
  return this.http.put(`${this.APIURL}updateProfile`,profileData,{...this.httpOption, responseType: 'text' }).pipe(
    catchError(this.handleError)
  )
}
}
