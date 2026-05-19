import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminAuthorizationComponent } from './Components/admin-authorization/admin-authorization.component';
import { LoginComponent } from './Components/login/login.component';
import { HeaderComponent } from './Components/header/header.component';
import { LoadingProgressBarComponent } from './Components/loading-progress-bar/loading-progress-bar.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './Services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthInterceptor } from './auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AdminAuthorizationComponent,
    LoginComponent,
    HeaderComponent,
    LoadingProgressBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
   { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
   JwtHelperService,
   AuthService,
   provideAnimationsAsync(

   ),
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
