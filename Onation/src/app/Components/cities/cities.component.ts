import { Component, OnInit } from '@angular/core';
import { Icities } from '../../Models/icities';
import { CountriesDataService } from '../../Services/countries-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../Services/loading.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export class CitiesComponent implements OnInit {
city:Icities | null=null;
cityList:Icities []=[];
filteredCityList: Icities[] = [];
countryId: number | null = null;
errorMessage:string=' ';

constructor(private countryService:CountriesDataService,private route: ActivatedRoute,public loadingService:LoadingService,private router:Router){
}
  ngOnInit(): void {
    this.loadingService.show();
    this.route.params.subscribe(params => {
      this.countryId = +params['cid'];
      console.log('Received countryId:', this.countryId);
      if (this.countryId !== null) {
        this.countryService.getAllCities().subscribe({
          next: (data) => {
            this.loadingService.hide();
            this.cityList = data;
            this.filteredCityList = this.cityList.filter(city => city.countryId === this.countryId);
            console.log('Filtered cities:', this.filteredCityList);

          },
          error: (err) => {
            this.loadingService.hide();
            console.log(err);
            if (err.status === 0) {
              this.router.navigate(['/NetworkError'])
            } else if (err.status === 500) {
              this.router.navigate(['/ServerError'])
            } else {
              this.errorMessage = `تعذر تحميل البيانات.`;
            }

          }
        });
      } else {
        this.loadingService.hide();
        console.error('Country ID is null or undefined');
        this.errorMessage = '.تعذر تحميل البيانات';


      }
    });
  }
  }



