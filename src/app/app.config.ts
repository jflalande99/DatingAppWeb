import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';


import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { InitServiceService } from 'src/core/init-service.service';
import { lastValueFrom } from 'rxjs';
import { errorInterceptor } from 'src/core/interceptors/error.interceptor';
import { jwtInterceptor } from 'src/core/interceptors/jwt.interceptor';
import { BusyServiceService } from 'src/core/busy-service.service';
import { loadingInterceptor } from 'src/core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([errorInterceptor, jwtInterceptor, loadingInterceptor])), 
  ]
};