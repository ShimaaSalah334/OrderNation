import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { AdminAuthorizationComponent } from './Components/admin-authorization/admin-authorization.component';

const routes: Routes = [
  {path:'',redirectTo:'/AdminLogin',pathMatch:'full'},
  {path:'AdminLogin',component:LoginComponent // Use canMatch for Angular's route matching guard
},
  {path:'AdminAutherization',component:AdminAuthorizationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
