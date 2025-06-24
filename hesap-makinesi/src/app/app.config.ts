import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; 
import { authInterceptorProvider } from './interceptors/auth'; 
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideHttpClient fonksiyonunu bu şekilde kullanmalısınız!
    // Asla HttpClientModule'ü imports dizisine eklemeyin.
    provideHttpClient(withInterceptorsFromDi()), 
    authInterceptorProvider, 
  ]
};