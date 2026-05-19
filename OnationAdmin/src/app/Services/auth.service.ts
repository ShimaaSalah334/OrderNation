import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, retry, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOption;
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  private APIURL:string="https://projects.runasp.net/api/Account/";
  constructor(private http:HttpClient,private jwtHelper: JwtHelperService) {
    this.httpOption={
      headers:new HttpHeaders({
        'accept': '*/*',
        'Content-Type':'application/json',
        //,Authorization: 'my-auth-token'
      })
    }
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  logIn(loginObj:any){
    return this.http.post<{ token: 'string' }>(`${this.APIURL}login`,loginObj,this.httpOption).pipe(
      tap(response=>{
        if(response && response.token){
          localStorage.setItem('authToken', response.token);

        }
      }),
      retry(3),
      catchError(this.handleError)
    )

  }
  get token() {
    if (this.isLocalStorageAvailable) {
    return localStorage.getItem('authToken')|| null;
  }else{
    return null;
  }
  }

  get isAuthenticated(): boolean {
    const token = this.token;
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  get isAdmin(): boolean {
    const token = this.token;
    if (!token) return false;

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.role === 'admin';
  }
}
