import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
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
export class EditAuthorizationService {

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
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  editCountry(countryName: ICountry): Observable<string> {
    return this.http.put('https://projects.runasp.net/api/Countries/api/Country', countryName, { ...this.httpOption, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
  editCity(cityName:ICity ): Observable<string> {
    return this.http.put('https://projects.runasp.net/api/CountryCity/api/City', cityName, { ...this.httpOption, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
  editTouristicPlace(touristicPlaceName:ITouristicPlace ): Observable<string> {
    return this.http.put('https://projects.runasp.net/api/TouristicPlace/api/UpdateTouristicPlaces', touristicPlaceName, { ...this.httpOption, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
  editCountryGroup(countryGroupName: ICountryGroup): Observable<string> {
    return this.http.put('https://projects.runasp.net/api/CountryGroup/api/CountryGroup', countryGroupName, { ...this.httpOption, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
  editPurpose(purposeName:IPurpose ): Observable<string> {
    return this.http.put('https://projects.runasp.net/api/Purpose/api/Purpose', purposeName, { ...this.httpOption, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
  editEmbassy(embassyeName:IEmbassy ): Observable<string> {
    return this.http.put('https://projects.runasp.net/api/Embassy/api/embassies', embassyeName, { ...this.httpOption, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
  editPaper(paperName:IPaper ): Observable<string> {
    return this.http.put('https://projects.runasp.net/api/Paper/api/Paper', paperName, { ...this.httpOption, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
  editLink(LinkName:ILinks ): Observable<string> {
    return this.http.put('https://projects.runasp.net/api/Link/api/liks', LinkName, { ...this.httpOption, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }}
