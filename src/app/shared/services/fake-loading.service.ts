import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeLoadingService {
  loadingTime = 1;

  constructor() {}

  loadingWithPromise(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i === this.loadingTime) {
          clearInterval(interval);
          if (email === 'asd@asd.asd' && password === 'asd') {
            resolve(true);
          } else {
            reject(false);
          }
        }
      }, 1000);
    });
  }
}