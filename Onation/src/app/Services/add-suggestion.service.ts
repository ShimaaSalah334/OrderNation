import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Isuggesstion } from '../Models/isuggesstion';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class AddSuggestionService {
  httpOption;
  constructor(private http:HttpClient) {
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
      if (error.status === 500) {
        console.error('Backend returned code 500, body was:', error.error);
        // Return an observable with a user-facing error message for a 500 error specifically
        return throwError(() => new Error('Internal Server Error; please try again later.'));
      } else {
        console.error(`Backend returned code ${error.status}, body was:`, error.error);
      }
    }
    // Return an observable with a user-facing error message for other errors
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  addSuggestion(newSugg:Isuggesstion):Observable<string>{
    return this.http.post('https://projects.runasp.net/api/Suggestion/AddSuggestion',newSugg,{ ...this.httpOption, responseType:'text'}).pipe(
      catchError(this.handleError)
    )
  }
}
