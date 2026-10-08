import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';


import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { InitServiceService } from 'src/core/init-service.service';
import { lastValueFrom } from 'rxjs';
import { errorInterceptor } from 'src/core/interceptors/error.interceptor';
import { jwtInterceptor } from 'src/core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([errorInterceptor, jwtInterceptor])), 
  ]
};