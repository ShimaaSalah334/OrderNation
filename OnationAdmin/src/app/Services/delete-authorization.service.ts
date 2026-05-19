import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { ICity } from '../Models/icity';
import { ICountry } from '../Models/icountry';
import { ICountryGroup } from '../Models/icountry-group';
import { IEmbassy } from '../Models/iembassy';
import { ILinks } from '../Models/ilinks';
import { IPaper } from '../Models/ipaper';
import { IPurpose } from '../Models/ipurpose';
import { ITouristicPlace } from '../Models/itouristic-place';

@Injectable({
  providedIn: 'root'
})
export class DeleteAuthorizationService {
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
   private handleError<T>(error: HttpErrorResponse):Observable<T> {
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

  deleteCountry(countryName: ICountry): Observable<string> {
    const options = {
      ...this.httpOption,
      responseType: 'text' as 'json', // Type assertion to satisfy TypeScript
      body: countryName
    };

    return this.http.delete<string>('https://projects.runasp.net/api/Countries/DeleteCountryByID', options).pipe(
      catchError(this.handleError<string>)
    );
  }



  deleteCity(cityName: ICity): Observable<string> {
    const options = {
      ...this.httpOption,
      responseType: 'text' as 'json', // Type assertion to satisfy TypeScript
      body: cityName
    };

    return this.http.delete<string>('https://projects.runasp.net/api/CountryCity/DeleteCountry City', options).pipe(
      catchError(this.handleError<string>)
    );
  }
  deleteTouristicPlace(touristicPlaceName: ITouristicPlace): Observable<string> {
    const options = {
      ...this.httpOption,
      responseType: 'text' as 'json', // Type assertion to satisfy TypeScript
      body: touristicPlaceName
    };

    return this.http.delete<string>('https://projects.runasp.net/api/TouristicPlace/DeleteTouristicPlaces', options).pipe(
      catchError(this.handleError<string>)
    );
  }
  deleteCountryGroup(countryGroupName: ICountryGroup): Observable<string> {
    const options = {
      ...this.httpOption,
      responseType: 'text' as 'json', // Type assertion to satisfy TypeScript
      body: countryGroupName
    };

    return this.http.delete<string>('https://projects.runasp.net/api/CountryGroup/DeleteCountry Group', options).pipe(
      catchError(this.handleError<string>)
    );
  }
  deletePurpose(purposeName: IPurpose): Observable<string> {
    const options = {
      ...this.httpOption,
      responseType: 'text' as 'json', // Type assertion to satisfy TypeScript
      body: purposeName
    };

    return this.http.delete<string>('https://projects.runasp.net/api/Purpose/Delete Purpose', options).pipe(
      catchError(this.handleError<string>)
    );
  }
  deleteEmbassy(embassyName: IEmbassy): Observable<string> {
    const options = {
      ...this.httpOption,
      responseType: 'text' as 'json', // Type assertion to satisfy TypeScript
      body: embassyName
    };

    return this.http.delete<string>('https://projects.runasp.net/api/Embassy/DeleteEmbassy', options).pipe(
      catchError(this.handleError<string>)
    );
  }

  deletePaper(paperName: IPaper): Observable<string> {
    const options = {
      ...this.httpOption,
      responseType: 'text' as 'json', // Type assertion to satisfy TypeScript
      body: paperName
    };

    return this.http.delete<string>('https://projects.runasp.net/api/Paper/DeletePaper', options).pipe(
      catchError(this.handleError<string>)
    );
  }

  deleteLink(linkName: ILinks): Observable<string> {
    const options = {
      ...this.httpOption,
      responseType: 'text' as 'json', // Type assertion to satisfy TypeScript
      body: linkName
    };

    return this.http.delete<string>('https://projects.runasp.net/api/Link/DeleteLink', options).pipe(
      catchError(this.handleError<string>)
    );
  }
}
