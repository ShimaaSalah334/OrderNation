import { Component, OnInit } from '@angular/core';
import { Ipurposes } from '../../Models/ipurposes';
import { CountriesDataService } from '../../Services/countries-data.service';
import { showHideDiscoverMoreAnimation } from '../../app.component';
import { LoadingService } from '../../Services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ipapers } from '../../Models/ipapers';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrl: './papers.component.css',
  animations:[showHideDiscoverMoreAnimation]
})
export class PapersComponent implements OnInit {
  purposeList:Ipurposes[]=[];
purpose:Ipurposes |null=null;
pId:number=0;
showSomeDetails:boolean=false;
showRelatedToCountry:boolean=false;
showNotes:boolean=false;
showEmbassies:boolean=false;



someDetailsArrowImage!: HTMLImageElement;
relatedCountryArrowImage!: HTMLImageElement;
notesArrowImage!: HTMLImageElement;
embassiesArrowImage!: HTMLImageElement;

paper:Ipapers | null=null;
paperList:Ipapers []=[];
filteredPaperList: Ipapers[] = [];
countryId: number | null = null;
purposeId: number | null = null;

errorMessage:string=' ';
alert:boolean=false;
constructor(private countryService:CountriesDataService,public loadingService:LoadingService,private route: ActivatedRoute,private router:Router){
 this.countryService.getAllPurposes();

  this.purpose=this.countryService.getPurposeByID(this.pId)

}
  ngOnInit(): void {
    this.loadingService.show();
    this.route.params.subscribe(params => {
      this.countryId = +params['cid'];
      this.purposeId = +params['pid'];

      console.log('Received countryId',this.countryId);
      console.log(' purpose id',this.purposeId);

      if (this.countryId !== null && this.purposeId!==null) {
        this.countryService.getAllPapers().subscribe({
          next: (data) => {
            this.loadingService.hide();
            this.paperList = data;
            this.filteredPaperList = this.paperList.filter(paper => paper.countryId === this.countryId);
            this.filteredPaperList = this.paperList.filter(paper => paper.purposeId === this.purposeId);

            console.log('Filtered papers:', this.filteredPaperList);

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
    });  }
openSomeDetails(){
  if(this.showSomeDetails=!this.showSomeDetails){
    this.someDetailsArrowImage = document.getElementById("arrow-someDetails") as HTMLImageElement;
   this.someDetailsArrowImage.src = "assets/upArrow (2).png" ;
    }else{
      this.someDetailsArrowImage.src = "assets/downArrow (1).png" ;
    }};

    openRelatedToCountry(){
      if(this.showRelatedToCountry=!this.showRelatedToCountry){
        this.relatedCountryArrowImage = document.getElementById("arrow-relatedToCountry") as HTMLImageElement;
       this.relatedCountryArrowImage.src = "assets/upArrow (2).png" ;
        }else{
          this.relatedCountryArrowImage.src = "assets/downArrow (1).png" ;
        }};
        openNotes(){
          if(this.showNotes=!this.showNotes){
            this.notesArrowImage = document.getElementById("arrow-notes") as HTMLImageElement;
           this.notesArrowImage.src = "assets/upArrow (2).png" ;
            }else{
              this.notesArrowImage.src = "assets/downArrow (1).png" ;
            }};

            openEmbassies(){
              if(this.showEmbassies=!this.showEmbassies){
                this.embassiesArrowImage = document.getElementById("arrow-embassies") as HTMLImageElement;
               this.embassiesArrowImage.src = "assets/upArrow (2).png" ;
                }else{
                  this.embassiesArrowImage.src = "assets/downArrow (1).png" ;
                }}

                showSign(){
                  this.alert=!this.alert

                }

                closeDiv(){
                  this.alert=false
                }
    }

