import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import 'zone.js'; // ✅ Required for Angular change detection
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient() 
  ]
});