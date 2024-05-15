import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  Observer,
  Subject,
  throwError,
} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoosterService {
  constructor(private http: HttpClient) {}

  private apiBaseURL = `https://api.magicthegathering.io/v1`;
  private boostersSubject = new BehaviorSubject<any>(null);
  private cardsSubject = new BehaviorSubject<any>(null);

  public searchBoosters(
    queryName: string,
    queryBlock: string
  ): Observable<any> {
    let queryParams = new HttpParams().set('block', queryBlock);
    if (queryName) {
      queryParams = queryParams.set('name', queryName);
    }

    return this.http
      .get(`${this.apiBaseURL}/sets`, { params: queryParams })
      .pipe(map((response) => response));
  }

  public setBoostersSubject(boostersData: any): void {
    this.boostersSubject.next(boostersData);
  }

  public getBoostersSubject(): Observable<any> {
    return this.boostersSubject.asObservable();
  }

  public getCards(boosterId: string): Observable<any> {
    return this.http
      .get(`${this.apiBaseURL}/sets/${boosterId}/booster`)
      .pipe(map((response) => response));
  }

  public setCardsSubject(cardsData: any): void {
    this.cardsSubject.next(cardsData);
  }

  public getCardsSubject(): Observable<any> {
    return this.cardsSubject.asObservable();
  }
}
