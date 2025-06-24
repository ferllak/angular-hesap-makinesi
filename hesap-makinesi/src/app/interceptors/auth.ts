import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // <-- BURASI ÖNEMLİ: environment dosyasını import ediyoruz

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Token'ı environment dosyasından alıyoruz
    const authToken = environment.authToken;

    // Token varsa (boş değilse) ve API URL'iniz localhost değilse (API'niz CORS'u halletmiyorsa token göndermeyebiliriz)
    // Ancak genellikle token her zaman gönderilir, bu yüzden 'if (authToken)' yeterlidir.
    if (authToken) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }
}

export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};