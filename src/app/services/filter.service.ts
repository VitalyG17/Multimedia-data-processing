import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class FilterService {
  private filterSubject: Subject<{
    filter: string;
    coefficient?: number;
    gamma?: number;
    minBrightness?: number;
    maxBrightness?: number;
    threshold?: number;
  }> = new Subject();

  public filterSelected$: Observable<{
    filter: string;
    coefficient?: number;
    gamma?: number;
    minBrightness?: number;
    maxBrightness?: number;
    threshold?: number;
  }> = this.filterSubject.asObservable();

  public selectFilter(
    filter: string,
    coefficient?: number,
    gamma?: number,
    minBrightness?: number,
    maxBrightness?: number,
    threshold?: number,
  ): void {
    this.filterSubject.next({filter, coefficient, gamma, minBrightness, maxBrightness, threshold});
  }
}
