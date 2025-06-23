import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // app.config.ts dosyasından appConfig'i import et
import { AppComponent } from './app/app'; // src/app/app.ts dosyasındaki AppComponent'i import et

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));