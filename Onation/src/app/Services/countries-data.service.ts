import { Injectable } from '@angular/core';
import { Icountries } from '../Models/icountries';
import { Icities } from '../Models/icities';
import { Itouristattractions } from '../Models/itouristattractions';
import { Ipurposes } from '../Models/ipurposes';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Route, Router } from '@angular/router';
import { Ipapers } from '../Models/ipapers';

@Injectable({
  providedIn: 'root'
})
export class CountriesDataService {
private countryData:Icountries[]=[];
private purposes:Ipurposes[]=[];
private cityData:Icities[]=[];
private touristAttData:Itouristattractions[]=[];
private countryListSubject: BehaviorSubject<Icountries[]> = new BehaviorSubject<Icountries[]>([]);
public countryList$: Observable<Icountries[]> = this.countryListSubject.asObservable();
private favorites:BehaviorSubject<Icountries[]>  = new BehaviorSubject<Icountries[]>([]);
public favoriteList$:Observable<Icountries[]> = this.favorites.asObservable();
private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  constructor(private http:HttpClient,private loadingService:LoadingService, private router:Router) {
        this.loadFavoritesFromLocalStorage();

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

  getAllCountries(): Observable<Icountries[]> {
    if (this.countryData.length > 0) {
      return of(this.countryData).pipe(
        tap(() => this.updateFavoriteStatus())

      )
    } else {
      return this.http.get<Icountries[]>('https://projects.runasp.net/api/Countries/getAllCountries').pipe(
        tap(data => {
          this.countryData = data;
          this.updateFavoriteStatus(); // Update favorite status after loading countries
          this.countryListSubject.next(data);

        }),
        catchError(this.handleError)
      );

    }
  }

  getCountryByID(cID: number): Observable<Icountries | null> {
    if (this.countryData.length > 0) {
      const foundCountry = this.countryData.find(country => country.countryId === cID);
      return of(foundCountry ? foundCountry : null);
    } else {
      return this.getAllCountries().pipe(
        map(countries => countries.find(country => country.countryId === cID) || null),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      );
    }
  }
  searchCountries(countryName: string): void {
    this.loadingService.showProgressBar();
    if (!countryName.trim()) {
      this.http.get(`https://projects.runasp.net/api/Countries/getAllCountries`, { responseType: 'text' }).pipe(
          map((response: string) => {
              try {
                  return JSON.parse(response) as Icountries[];
              } catch (e) {
                  console.error('Failed to parse response:', e);
                  return [];
              }
          }),
          catchError(this.handleError)
      ).subscribe({
          next: (res) => {
              this.countryListSubject.next(res);
              this.loadingService.hideProgressBar();
              this.router.navigate(['/Countries']);
          },
          error: (err) => {
              console.error(err);
              this.loadingService.hideProgressBar();
          }
      });
      return;
  }


    this.http.get(`https://projects.runasp.net/api/Countries/Search?title=${countryName}`, { responseType: 'text' }).pipe(
      map((response: string) => {
        try {
          return JSON.parse(response) as Icountries[];
        } catch (e) {
          console.error('Failed to parse response:', e);
          return [];
        }
      }),
      catchError(this.handleError)
    ).subscribe({
      next: (res) =>{this.countryListSubject.next(res),console.log
        this.loadingService.hideProgressBar();
        if (res.length > 0) {
          this.countryListSubject.next(res);
          this.router.navigate(['/Countries']); // Ensure you navigate back to the country list component
        } else {
          this.router.navigate(['/NotFound']);
        }

      },
      error: (err) => {console.error(err)
        this.loadingService.hideProgressBar();
        this.router.navigate(['/NotFound']);



      }
    });
  }
  filterCountries(countryName: string): void {
    if (!countryName.trim()) {
      // If no search term, return all countries
      this.countryListSubject.next(this.countryData);
      return;
    }


    this.http.get(`https://projects.runasp.net/api/Countries/namesByContinent/${countryName}`, { responseType: 'text' }).pipe(
      map((response: string) => {
        try {
          return JSON.parse(response) as Icountries[];
        } catch (e) {
          console.error('Failed to parse response:', e);
          return [];
        }
      }),
      catchError(this.handleError)
    ).subscribe({
      next: (res) => this.countryListSubject.next(res),
      error: (err) => console.error(err)
    });
  }
  private loadFavoritesFromLocalStorage() {
    if (this.isLocalStorageAvailable) {//code here}

    const favoritesJson = localStorage.getItem('favoriteCountries');

    if (favoritesJson) {
      const favorites = JSON.parse(favoritesJson) as Icountries[];
      this.favorites.next(favorites);
    }
  }
  }

  private saveFavoritesToLocalStorage() {
    const favorites = this.favorites.value;
    localStorage.setItem('favoriteCountries', JSON.stringify(favorites));
  }

  private updateFavoriteStatus() {
    const favorites = this.favorites.value;
    this.countryData.forEach(country => {
      country.favoriteCountry = favorites.some(fav => fav.countryId === country.countryId);
    });
  }

  toggleFavorite(country: Icountries) {
    country.favoriteCountry = !country.favoriteCountry;
    let currentFavorites = this.favorites.value;
    if (country.favoriteCountry) {
      currentFavorites = [...currentFavorites, country];
    } else {
      currentFavorites = currentFavorites.filter(fav => fav.countryId !== country.countryId);
    }
    this.favorites.next(currentFavorites);
    this.saveFavoritesToLocalStorage();
  }
  getAllCities():Observable<Icities[]>{
    return this.http.get<Icities[]>('https://projects.runasp.net/api/CountryCity/getAllCountryCityData').pipe(
      catchError(this.handleError)
    )
  }

  getAllTouristAtt():Observable<Itouristattractions[]>{
    return this.http.get<Itouristattractions[]>('https://projects.runasp.net/api/TouristicPlace/getAllTouristicPlace').pipe(
      catchError(this.handleError)
    )
  
  }
  getCountriesIDs():number[]{
    let countryIDS:number[]=this.countryData.map(country=>country.countryId)
    return countryIDS;
   }

  getCityByName(cityName:string):Icities | null{
    let foundCity=this.cityData.find(city=>city.countryCity1)
    return foundCity? foundCity:null;

  }

  getTouristAttByName(touristAttName:string):Itouristattractions | null{
    let foundTouristAtt=this.touristAttData.find(touristAtt=>touristAtt.placeName)
    return foundTouristAtt? foundTouristAtt:null;

  }


  getAllPurposes():Observable<Ipurposes[]>{
    return this.http.get<Ipurposes[]>('https://projects.runasp.net/api/Purpose/getAllPurpose').pipe(
      catchError(this.handleError)
    )
      }
      getAllPapers():Observable<Ipapers[]>{
        return this.http.get<Ipapers[]>('https://projects.runasp.net/api/Paper/getAllPaper').pipe(
          catchError(this.handleError)
        );
      }

  getPurposeByID(pID:number):Ipurposes | null{
    let foundPurpose=this.purposes.find(purpose=>purpose==pID)
    return foundPurpose? foundPurpose:null;

  }
}
