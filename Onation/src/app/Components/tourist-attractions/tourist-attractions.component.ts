import { Component, OnInit } from '@angular/core';
import { Itouristattractions } from '../../Models/itouristattractions';
import { CountriesDataService } from '../../Services/countries-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../Services/loading.service';

@Component({
  selector: 'app-tourist-attractions',
  templateUrl: './tourist-attractions.component.html',
  styleUrl: './tourist-attractions.component.css'
})
export class TouristAttractionsComponent implements OnInit {
  touristAtt:Itouristattractions | null=null;
  touristAttname:string='';
  touristAttList:Itouristattractions []=[];
  filteredtouristAttList: Itouristattractions[] = [];
countryId: number | null = null;
errorMessage:string=' ';

  constructor(private countryService:CountriesDataService,private route: ActivatedRoute,public loadingService:LoadingService,private router:Router){
    this.touristAtt=this.countryService.getTouristAttByName(this.touristAttname)
  }
  ngOnInit(): void {
    this.loadingService.show();
    this.route.params.subscribe(params => {
      this.countryId = +params['cid'];
      console.log('Received countryId:', this.countryId);
      if (this.countryId !== null) {
        this.countryService.getAllTouristAtt().subscribe({
          next: (data) => {
            this.loadingService.hide();
            this.touristAttList = data;
            this.filteredtouristAttList = this.touristAttList.filter(touristatt => touristatt.countryId === this.countryId);
            console.log('Filtered Tourist Attractions:', this.filteredtouristAttList);

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
        this.errorMessage = 'تعذر تحميل البيانات.';


      }
    });
  }
 }

