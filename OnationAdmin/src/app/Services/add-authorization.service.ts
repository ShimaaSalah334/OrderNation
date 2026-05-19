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
export class AddAuthorizationService {
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
  addCountry(newCountry: ICountry): Observable<string> {
    return this.http.post('https://projects.runasp.net/api/Countries/addcountry', newCountry, { ...this.httpOption, responseType:'text'}).pipe(
      catchError(this.handleError)
    );

  }
  getCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('https://projects.runasp.net/api/Countries/getAllCountries').pipe(
      catchError(this.handleError)
    );
  }
  getCountryGroups(): Observable<ICountryGroup[]> {
    return this.http.get<ICountryGroup[]>('https://projects.runasp.net/api/CountryGroup/getAllCountyGroup').pipe(
      catchError(this.handleError)
    );
  }
  getCities():Observable<ICity[]> {
    return this.http.get<ICity[]>('https://projects.runasp.net/api/CountryCity/getAllCountryCityData').pipe(
      catchError(this.handleError)
    );
  }
  getTouristicPlaces():Observable<ITouristicPlace[]> {
    return this.http.get<ITouristicPlace[]>('https://projects.runasp.net/api/TouristicPlace/getAllTouristicPlace').pipe(
      catchError(this.handleError)
    );
  }
  getEmbassies():Observable<IEmbassy[]> {
    return this.http.get<IEmbassy[]>('https://projects.runasp.net/api/Embassy/getAllEmbassy').pipe(
      catchError(this.handleError)
    );
  }

  getPapers():Observable<IPaper[]> {
    return this.http.get<IPaper[]>('https://projects.runasp.net/api/Paper/getAllPaper').pipe(
      catchError(this.handleError)
    );
  }

  getLinks():Observable<ILinks[]> {
    return this.http.get<ILinks[]>('https://projects.runasp.net/api/Link/getAllLinks').pipe(
      catchError(this.handleError)
    );
  }

  addCity(newCity:ICity): Observable<string> {
    return this.http.post('https://projects.runasp.net/api/CountryCity/addcountrycity', newCity, { ...this.httpOption, responseType:'text'}).pipe(
      catchError(this.handleError)
    );

  }
  addTouristicPlace(newTouristicPlace:ITouristicPlace): Observable<string> {
    return this.http.post('https://projects.runasp.net/api/TouristicPlace/addtouristicplace', newTouristicPlace, { ...this.httpOption, responseType:'text'}).pipe(
      catchError(this.handleError)
    );

  }
  addCountryGroup(newCountryGroup:ICountryGroup): Observable<string> {
    return this.http.post('https://projects.runasp.net/api/Countries/addcountrygroup', newCountryGroup, { ...this.httpOption, responseType:'text'}).pipe(
      catchError(this.handleError)
    );

  }
  addEmbassy(newEmbassy:IEmbassy): Observable<string> {
    return this.http.post('https://projects.runasp.net/api/Embassy/addembassy', newEmbassy, { ...this.httpOption, responseType:'text'}).pipe(
      catchError(this.handleError)
    );

  }
  addPurpose(newPurpose:IPurpose): Observable<string> {
    return this.http.post('https://projects.runasp.net/api/Purpose/addPurpose', newPurpose, { ...this.httpOption, responseType:'text'}).pipe(
      catchError(this.handleError)
    );

  }
  getPurposes(): Observable<IPurpose[]> {
    return this.http.get<IPurpose[]>('https://projects.runasp.net/api/Purpose/getAllPurpose').pipe(
      catchError(this.handleError)
    );
  }
  addPaper(newPaper:IPaper): Observable<string> {
    return this.http.post('https://projects.runasp.net/api/Paper/addpaper', newPaper, { ...this.httpOption, responseType:'text'}).pipe(
      catchError(this.handleError)
    );

  }
  addLink(newLink:ILinks): Observable<string> {
    return this.http.post('https://projects.runasp.net/api/Link/addLink', newLink, { ...this.httpOption, responseType:'text'}).pipe(
      catchError(this.handleError)
    );

  }
}
