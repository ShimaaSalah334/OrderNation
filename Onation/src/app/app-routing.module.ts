import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Components/main/main.component';
import { PurposesComponent } from './Components/purposes/purposes.component';
import { CitiesComponent } from './Components/cities/cities.component';
import { TouristAttractionsComponent } from './Components/tourist-attractions/tourist-attractions.component';
import { EnterPhoneComponent } from './Registration/Registration_Components/ForgetPassword/enter-phone/enter-phone.component';
import { SendCodeComponent } from './Registration/Registration_Components/ForgetPassword/send-code/send-code.component';
import { ChangePasswordComponent } from './Registration/Registration_Components/ForgetPassword/change-password/change-password.component';
import { EnterEmailComponent } from './Registration/Registration_Components/ForgetPassword/enter-email/enter-email.component';
import { SignupLoginComponent } from './Registration/Registration_Components/signup-login/signup-login.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { PapersComponent } from './Components/papers/papers.component';
import { FavoritesComponent } from './Components/favorites/favorites.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { NetworkErrorConnectionComponent } from './Components/network-error-connection/network-error-connection.component';
import { ServerErrorComponent } from './Components/server-error/server-error.component';

const routes: Routes = [

  { path: '', redirectTo: '/SignUp-Login', pathMatch: 'full' },
  {path:'SignUp-Login',component:SignupLoginComponent},
  {path:'EnterEmail',component:EnterEmailComponent},
  {path:'SendCode',component:SendCodeComponent},
  {path:'ChangePassword',component:ChangePasswordComponent},
  {path:'NetworkError',component:NetworkErrorConnectionComponent},
  {path:'ServerError',component:ServerErrorComponent},



  {path:'',component:MainLayoutComponent,children:[
    { path: 'Countries', component: MainComponent },
    { path: 'Countries/:cid', component: PurposesComponent },
    { path: 'Cities/:cid', component: CitiesComponent },
    { path: 'TouristAttractions/:cid', component: TouristAttractionsComponent },
    {path:'AboutUs',component:AboutUsComponent},
    {path:'Papers/:pid',component:PapersComponent},
    {path:'Favorites',component:FavoritesComponent},
    { path: 'NotFound', component: NotFoundComponent },


  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
