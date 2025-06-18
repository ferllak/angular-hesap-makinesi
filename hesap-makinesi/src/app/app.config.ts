// src/app/app.config.ts (Eğer routing kullanmıyorsanız)
import { ApplicationConfig } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router'; // Bunu kaldırdık
// import { routes } from './app.routes'; // Bunu kaldırdık

export const appConfig: ApplicationConfig = {
  providers: [] // Sağlayıcılar dizisi boş olabilir
};