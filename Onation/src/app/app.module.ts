import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { MainComponent } from './Components/main/main.component';
import { MenuComponent } from './Components/menu/menu.component';
import { PurposesComponent } from './Components/purposes/purposes.component';
import { CitiesComponent } from './Components/cities/cities.component';
import { TouristAttractionsComponent } from './Components/tourist-attractions/tourist-attractions.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupLoginComponent } from './Registration/Registration_Components/signup-login/signup-login.component';
import { RegistrationModule } from './Registration/registration/registration.module';
import { EnterEmailComponent } from './Registration/Registration_Components/ForgetPassword/enter-email/enter-email.component';
import { EnterPhoneComponent } from './Registration/Registration_Components/ForgetPassword/enter-phone/enter-phone.component';
import { SendCodeComponent } from './Registration/Registration_Components/ForgetPassword/send-code/send-code.component';
import { ChangePasswordComponent } from './Registration/Registration_Components/ForgetPassword/change-password/change-password.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { PapersComponent } from './Components/papers/papers.component';
import { FavoritesComponent } from './Components/favorites/favorites.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingSpinnerComponent } from './Components/loading-spinner/loading-spinner.component';
import { AuthService } from './Services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AlertComponent } from './Components/alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeletedeleteConfirmationDialogComponent } from './Components/deletedelete-confirmation-dialog/deletedelete-confirmation-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './Components/progress-bar/progress-bar.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { NetworkErrorConnectionComponent } from './Components/network-error-connection/network-error-connection.component';
import { ServerErrorComponent } from './Components/server-error/server-error.component';




export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    MenuComponent,
    PurposesComponent,
    CitiesComponent,
    TouristAttractionsComponent,
    SignupLoginComponent,
    EnterEmailComponent,
    EnterPhoneComponent,
    SendCodeComponent,
    ChangePasswordComponent,
    MainLayoutComponent,
    AboutUsComponent,
    PapersComponent,
    FavoritesComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    DeletedeleteConfirmationDialogComponent,
    ProgressBarComponent,
    NotFoundComponent,
    NetworkErrorConnectionComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RegistrationModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressBarModule,
    NgxSpinnerModule.forRoot(),
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]

       } }
    ),




  ],
  providers: [provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    HttpClient

  ],
  bootstrap: [AppComponent],
  exports: [
    SignupLoginComponent,
    EnterEmailComponent,
    EnterPhoneComponent,
    SendCodeComponent,
    ChangePasswordComponent,
  ],
})
export class AppModule {}
