// spinner.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  private startTime: number = 0;
  private minDuration = 600; // minimum spinner time in ms

  show() {
    this.startTime = Date.now();
    this.loadingSubject.next(true);
  }

  hide() {
    const elapsed = Date.now() - this.startTime;
    const remaining = this.minDuration - elapsed;

    if (remaining > 0) {
      setTimeout(() => this.loadingSubject.next(false), remaining);
    } else {
      this.loadingSubject.next(false);
    }
  }
}
