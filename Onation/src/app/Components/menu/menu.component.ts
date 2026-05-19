import { Component, OnInit, ViewChild } from '@angular/core';
import { showHideMenuAnimation, showHideSettingsAnimation } from '../../app.component';
import { ThemeService } from '../../Services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { AddSuggestionService } from '../../Services/add-suggestion.service';
import { Isuggesstion } from '../../Models/isuggesstion';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertService } from '../../Services/alert.service';
import { IUserLogin } from '../../Models/iuser-login';
import { MatDialog } from '@angular/material/dialog';
import { DeletedeleteConfirmationDialogComponent } from '../deletedelete-confirmation-dialog/deletedelete-confirmation-dialog.component';
import { CountriesDataService } from '../../Services/countries-data.service';
import { LoadingService } from '../../Services/loading.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  animations:[showHideMenuAnimation,
    showHideSettingsAnimation,
      trigger('slideInOut', [
        transition(':enter', [
          style({ transform: 'translateY(-100%)' }),
          animate('300ms ease-in', style({ transform: 'translateY(0%)' })),
        ]),
        transition(':leave', [
          animate('300ms ease-out', style({ transform: 'translateY(-100%)' })),
        ]),
      ]),

  ]

})
export class MenuComponent implements OnInit{
  ShowSettings:boolean=false;
  ShowAddSugg:boolean=false;
  ShowProfile:boolean=false;
  ShowEditProfile:boolean=false;
  arrowImageSetting!: HTMLImageElement;
  arrowImageAddSugg!: HTMLImageElement;
  isDarkMode: boolean;
  Hoveredhome: boolean=false;
  Hoveredprofile: boolean=false;
  HoveredaboutUs: boolean=false;
  Hoveredfavorite: boolean=false;
 ShowLang:boolean=false;
 lang:string='ar';
 private isLocalStorageAvailable = typeof localStorage !== 'undefined';
isCustomStyleEnabled: boolean = true;
countryName: string='';
newSugg:Isuggesstion={} as Isuggesstion;
currUser:any={};
isLoading: boolean = false;
progressValue: number = 0;
editProfileForm: FormGroup;
alertSaveChanges: boolean = false;
alertSaveChangesError: boolean = false;
alertDeleteAccountError: boolean = false;
errorMessage:string = ' ';

  constructor(private auth:AuthService,private addsuggservice:AddSuggestionService, private themeService: ThemeService,private translateService:TranslateService,private router:Router,
    private alertService: AlertService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private countriesService:CountriesDataService,
    public loadingService:LoadingService

  ) {
    this.editProfileForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });
    this.isDarkMode = this.themeService.isDarkMode();

  }
  ngOnInit(): void {
 if (this.isLocalStorageAvailable) {//code here}
    this.lang= localStorage.getItem('lang') || 'ar';
  }
  this.auth.getCurrUser().subscribe({
    next:(res)=>{
     this.currUser=res;
    },
    error:(err)=>{
      console.log(err)
      this.errorMessage = 'تعذر تحميل البيانات.';

    }
  })
}

  openSettings(){

    if(this.ShowSettings=!this.ShowSettings){
    this.arrowImageSetting = document.getElementById("arrow") as HTMLImageElement;
   this.arrowImageSetting.src = "assets/uparrow.png" ;
    }else{
      this.arrowImageSetting.src = "assets/down.png" ;
    }
  }
  openAddSuggestion(){
    if(this.ShowAddSugg=!this.ShowAddSugg){
      this.arrowImageAddSugg = document.getElementById("arrow-sugg") as HTMLImageElement;
     this.arrowImageAddSugg.src = "assets/uparrow.png" ;
      }else{
        this.arrowImageAddSugg.src = "assets/down.png" ;
      }
  }
  ShowMediaAddSugg:boolean=false
  openModal() {
    this.ShowMediaAddSugg = true;
  }

  closeModal() {
    this.ShowMediaAddSugg = false;
  }
  openProfile(){
    this.ShowProfile=!this.ShowProfile;
  }
  closeProfile(){
    this.ShowProfile=!this.ShowProfile;
    this.Hoveredprofile=false

  }

  openEditProfile() {
    this.ShowEditProfile = true;
    // Set form values from current user data
    this.editProfileForm.patchValue({
      userName: this.currUser.userName,
      email: this.currUser.email,
      phoneNumber: this.currUser.phoneNumber
    });
  }
  closeEditProfile(){
    this.ShowEditProfile=!this.ShowEditProfile;

  }

  updateProfile() {
    this.loadingService.showProgressBar();
    if (this.editProfileForm.valid) {
      const updatedProfileData = this.editProfileForm.value;
     this.auth.updateProfile(updatedProfileData).subscribe({
      next:(res) =>{
        console.log(res)
        this.loadingService.hideProgressBar();
        this.alertSaveChanges=!this.alertSaveChanges
        setTimeout(() => {
          window.location.reload();
        }, 1200);


      },
      error:(err)=>{
        console.log(err)
        this.loadingService.hideProgressBar();
        if (err.status === 0) {
          this.router.navigate(['/NetworkError'])
        } else if (err.status === 500) {
          this.router.navigate(['/ServerError'])
        } else {
          this.alertSaveChangesError= !this.alertSaveChangesError
          setTimeout(() => {
            this.alertSaveChangesError=false
          }, 2000);        }

      }
     })
    }else{
      this.loadingService.hideProgressBar();
      this.errorMessage = 'تعذر تحميل البيانات.';

    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
 homeHover(){
  if( this.Hoveredhome=!this.Hoveredhome){
    this.Hoveredprofile=false
    this.HoveredaboutUs=false
    this.Hoveredfavorite=false
  }else{
    this.Hoveredhome=!this.Hoveredhome
  }
 }
  profileHover(){
  if( this.Hoveredprofile=!this.Hoveredprofile){
    this.Hoveredhome=false
    this.HoveredaboutUs=false
    this.Hoveredfavorite=false

  }else{
    this.Hoveredprofile=!this.Hoveredprofile
  }

  }
  aboutUsHover(){
    if( this.HoveredaboutUs=!this.HoveredaboutUs){
      this.Hoveredhome=false
      this.Hoveredprofile=false
      this.Hoveredfavorite=false

    }else{
      this.HoveredaboutUs=!this.HoveredaboutUs
    }

  }
 favoriteHover(){
    if( this.Hoveredfavorite=!this.Hoveredfavorite){
      this.Hoveredhome=false;
      this.Hoveredprofile=false;
      this.HoveredaboutUs=false;
      this.Hoveredfavorite=true

    }else{
      this.Hoveredfavorite=!this.Hoveredfavorite
    }

  }
  openLang(){
    this.ShowLang =! this.ShowLang

  }
  changeLang(lang:any){
    const selectedLanguage=lang.target.value;
    if (this.isLocalStorageAvailable) {//code here}
    localStorage.setItem('lang',selectedLanguage);
    }
    this.translateService.use(selectedLanguage);
  }
logOut(){
  this.auth.logout()
  this.router.navigate(['/SignUp-Login'])
}
  deleteAccount(){
this.loadingService.showProgressBar();
    this.auth.delete().subscribe({
      next:()=>{
console.log('Account deleted')
this.loadingService.hideProgressBar();
this.auth.logout();
this.router.navigate(['/SignUp-Login'])
      },
      error:(err)=>{
        console.log(err.message)
        this.loadingService.hideProgressBar();
        this.alertDeleteAccountError=!this.alertDeleteAccountError
        setTimeout(() => {
          this.alertDeleteAccountError=false
        }, 2000);
      }
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DeletedeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAccount();
      }
    });
  }

  addsuggestion(form :NgForm){
    this.loadingService.showProgressBar();
this.addsuggservice.addSuggestion(this.newSugg).subscribe({
  next:()=>{
    console.log('')
    this.loadingService.hideProgressBar();

form.reset()
this.alertService.showAlert('تم إضافة الاقتراح بنجاح.');

          },
          error:(err)=>{
            console.log(err.message)
            this.loadingService.hideProgressBar();
            if (err.status === 0) {
              this.router.navigate(['/NetworkError'])
            } else if (err.status === 500) {
              this.router.navigate(['/ServerError'])
            } else {
              this.alertService.showAlertError('تعذر إضافة الاقتراح');
            }

          }
})
  }

  search() {

    this.countriesService.searchCountries(this.countryName)
  }

}
