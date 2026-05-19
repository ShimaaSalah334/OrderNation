import { Component, OnInit } from '@angular/core';
import { Icountries } from '../../Models/icountries';
import { CountriesDataService } from '../../Services/countries-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { showHideDiscoverMoreAnimation } from '../../app.component';
import { Ipurposes } from '../../Models/ipurposes';
import { LoadingService } from '../../Services/loading.service';

@Component({
  selector: 'app-purposes',
  templateUrl: './purposes.component.html',
  styleUrl: './purposes.component.css',
  animations:[showHideDiscoverMoreAnimation]
})
export class PurposesComponent implements OnInit {
  purpose:Ipurposes | null=null;
purposeList:Ipurposes []=[];
filteredPurposeList: Ipurposes[] = [];
pId:number=0;
  showDiscoverMore: boolean = false;
  currCountryID: number = 0;
  country: Icountries | null = null;
  countryIDSArr: number[] = [];
  arrowImage!: HTMLImageElement;
  countryId: number | null = null;
  errorMessage:string=' ';

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private countryService: CountriesDataService,
    public loadingService:LoadingService
  ) {
    this.purpose=this.countryService.getPurposeByID(this.pId)
    console.log(this.purpose)
    // console.log(this.activateRoute.snapshot.params)
    this.activateRoute.params.subscribe((res)=>{
      console.log(res)
    })
  }
  ngOnInit(): void {
    this.loadingService.show();

    this.activateRoute.params.subscribe(params => {
      this.countryId = +params['cid'];
      if (this.countryId !== null) {
        this.countryService.getCountryByID(this.countryId).subscribe({
          next: country => {
            this.country = country;
            console.log(country)
            if (!country) {
              console.error(`Country with ID ${this.countryId} not found.`);
            }
          },
          error: err => console.error(err)
        });
      }
    });
    this.activateRoute.params.subscribe(params => {
      this.countryId = +params['cid'];
      console.log('Received countryId:', this.countryId);
      if (this.countryId !== null) {
        this.countryService.getAllPurposes().subscribe({
          next: (data) => {
            this.loadingService.hide();
            this.purposeList = data;
            this.filteredPurposeList = this.purposeList.filter(purpose => purpose.countryId === this.countryId);
            console.log('Filtered cities:', this.filteredPurposeList);

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
    this.countryIDSArr = this.countryService.getCountriesIDs();

  }
  openDicoverMore() {

    if(this.showDiscoverMore=!this.showDiscoverMore){
      this.arrowImage = document.getElementById("discover-arrow") as HTMLImageElement;
     this.arrowImage.src = "assets/arrow-down.png" ;
      }else{
        this.arrowImage.src = "assets/arrow-up.png" ;
      }
  }
  openCities(){
    if (this.countryId !== null) {
      this.router.navigate(['/Cities', this.countryId]);
  }else {
    console.error('Country ID is null or undefined');
  }
}
openTouristAttractions(){
  if (this.countryId !== null) {
    this.router.navigate(['/TouristAttractions', this.countryId]);
  }else {
    console.error('Country ID is null or undefined');
  }
}


  showPapers(purposeID:number){
    this.router.navigate(['/Papers',purposeID],{queryParams:{id:this.country?.countryId}})
  }


}
