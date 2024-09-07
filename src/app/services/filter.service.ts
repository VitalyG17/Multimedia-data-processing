import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class FilterService {
  private filterSubject: Subject<string> = new Subject<string>();

  public filterSelected$: Observable<string> = this.filterSubject.asObservable();
  public selectFilter(filter: string): void {
    this.filterSubject.next(filter);
  }
}
