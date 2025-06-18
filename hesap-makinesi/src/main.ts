// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // <<< ".ts" uzantısını BURADAN SİLDİK
import { App } from './app/app'; // src/app/app.ts dosyasındaki App bileşenini import ediyoruz

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));