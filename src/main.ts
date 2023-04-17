import { enableProdMode, importProvidersFrom } from '@angular/core';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { environment } from './environments/environment';

import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from "firebase/app";


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  importProvidersFrom(
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
  ),
  importProvidersFrom(
    provideFirestore(() => getFirestore())
  ),
  ],
}).catch((err) => console.error(err));
