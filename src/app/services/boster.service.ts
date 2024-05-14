import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  Observer,
  Subject,
  throwError,
} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoosterService {
  constructor(private http: HttpClient) {}

  private apiURL = `https://api.magicthegathering.io/v1/sets`;
  private boostersSubject = new BehaviorSubject<any>(null);
  private errorSubject = new Subject<string>();

  public getErrorSubject(): Observable<string> {
    return this.errorSubject.asObservable();
  }

  public searchBoosters(
    queryName: string,
    queryBlock: string
  ): Observable<any> {
    let queryParams = new HttpParams().set('block', queryBlock);
    if (queryName) {
      queryParams = queryParams.set('name', queryName);
    }

    return this.http
      .get(this.apiURL, { params: queryParams })
      .pipe(map((response) => response));
  }

  public setBoostersSubject(boostersData: any): void {
    this.boostersSubject.next(boostersData);
  }

  public getBoostersSubject(): Observable<any> {
    return this.boostersSubject.asObservable();
  }
}
