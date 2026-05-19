import { Component, OnInit } from '@angular/core';
import { Iaboutus } from '../../Models/iaboutus';
import { AboutUsService } from '../../Services/about-us.service';
import { LoadingService } from '../../Services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnInit{
aboutUs:Iaboutus[]=[];
errorMessage:string=' ';
constructor(private aboutService:AboutUsService,public loadingService:LoadingService,private router:Router){}
  ngOnInit(): void {
    this.loadingService.show();
   this.aboutService.getAboutUs().subscribe({
   next: (data) => {
    this.loadingService.hide();
    this.aboutUs=data;
      console.log('About Us data:', data);

    },
   error: (error) => {
    this.loadingService.hide();
      console.error('Error fetching About Us data:', error);
      if (error.status === 0) {
        this.router.navigate(['/NetworkError'])
      } else if (error.status === 500) {
        this.router.navigate(['/ServerError'])
      } else {
        this.errorMessage = `تعذر تحميل البيانات.`;
      }

    }
  })
  }
}
