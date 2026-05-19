import { Component } from '@angular/core';
import { Icountries } from '../../Models/icountries';
import { CountriesDataService } from '../../Services/countries-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  favoriteCountries: Icountries[] = [];

  constructor(private countryService: CountriesDataService,private router:Router) { }

  ngOnInit(): void {
    this.countryService.favoriteList$.subscribe({
      next: (favorites) => {
        this.favoriteCountries = favorites;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  openPurpose(countryID:number){
    this.router.navigate(['/Countries',countryID])
  }
  toggleFavorite(item: Icountries): void {
    this.countryService.toggleFavorite(item);
  }

}
