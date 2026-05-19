import { Component, OnInit } from '@angular/core';
import { CountriesDataService } from '../../Services/countries-data.service';
import { Router } from '@angular/router';
import { Icountries } from '../../Models/icountries';
import { favoriteAnimation } from '../../app.component';
import { LoadingService } from '../../Services/loading.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  animations:[favoriteAnimation]
})
export class MainComponent implements OnInit{


  countryList:Icountries[]=[];
index: any;
filteredCountryList: Icountries[] = [];
  selectedContinent: string = 'الكل ';
  continentOptions: string[] = ['الكل']; // Initialize with 'الكل'
  errorMessage:string=' ';
 constructor(private countryService:CountriesDataService,private router:Router,public loadingService:LoadingService){

 }
  ngOnInit(): void {
    this.loadingService.showProgressBar();
    this.countryService.countryList$.subscribe({
      next: (countries) => {
        this.countryList = countries;
        this.filteredCountryList = this.countryList;
        this.continentOptions = [...new Set(this.countryList.map(country => country.countryContinent))];
        this.selectedContinent = 'الكل';
            },
      error: (err) => {
        console.error(err);

      }
    });

this.getCountries();
  }
  getCountries(){
    this.loadingService.show();
    this.loadingService.hideProgressBar();

    this.countryService.getAllCountries().subscribe({
      next:()=>{
        this.loadingService.hide();

      },
      error:(err)=>{
        this.loadingService.hide();
        console.error(err);
        if (err.status === 0) {
          this.router.navigate(['/NetworkError'])
        } else if (err.status === 500) {
          this.router.navigate(['/ServerError'])
        } else {
          this.errorMessage = `تعذر تحميل البيانات.`;
        }
      }
    });
  }
  openPurpose(countryID:number){
    this.router.navigate(['/Countries',countryID])
  }




  toggleFavorite(item: Icountries): void {
    this.countryService.toggleFavorite(item);
  }

onContinentSelect(): void {
  if (this.selectedContinent === 'الكل') {
    this.filteredCountryList = this.countryList; // Show all countries if 'الكل' is selected
  } else {
    this.filteredCountryList = this.countryList.filter(country => country.countryContinent === this.selectedContinent);
  }
}
}



