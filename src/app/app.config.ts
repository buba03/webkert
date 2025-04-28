import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      projectId: "art-shop-ab0d9",
      appId: "1:632013646300:web:c2eeed6d7610311f608719",
      storageBucket: "art-shop-ab0d9.firebasestorage.app",
      apiKey: "AIzaSyBckvJi-4MZ14UQ_l8KmWbYZ8ODN4zDsIE",
      authDomain: "art-shop-ab0d9.firebaseapp.com",
      messagingSenderId: "632013646300"
    })
    ),
    provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
