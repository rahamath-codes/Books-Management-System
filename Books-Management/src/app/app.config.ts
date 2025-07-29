import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { CredentialsInterceptor } from './interceptors/credentials-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),

    // ✅ Correct way to register HTTP interceptor
    provideHttpClient(
      withInterceptors([CredentialsInterceptor])
    ),
    provideRouter(routes)
  ]
};
