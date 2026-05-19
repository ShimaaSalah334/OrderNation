import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken ;

    if (this.isLocalStorageAvailable) {//code here}

     authToken = localStorage.getItem('authToken');
    }
    if (authToken) {
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(request);
    }
  }
}
