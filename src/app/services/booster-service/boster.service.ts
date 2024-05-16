import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBoosters, IBoostersSets } from '../../interfaces/boosters.model';
import { ICardsOriginal, ICardsSet } from '../../interfaces/cards.model';

@Injectable({
  providedIn: 'root',
})
export class BoosterService {
  constructor(private http: HttpClient) {}

  private apiBaseURL = `https://api.magicthegathering.io/v1`;
  private boostersSubject = new BehaviorSubject<IBoosters[]>([]);
  private cardsSubject = new BehaviorSubject<any>(null);

  public searchBoosters(
    queryName: string,
    queryBlock: string
  ): Observable<IBoostersSets> {
    let queryParams = new HttpParams().set('block', queryBlock);
    if (queryName) {
      queryParams = queryParams.set('name', queryName);
    }

    return this.http
      .get<IBoostersSets>(`${this.apiBaseURL}/sets`, { params: queryParams })
      .pipe(map((response) => response));
  }

  public setBoostersSubject(boostersData: IBoosters[]): void {
    this.boostersSubject.next(boostersData);
  }

  public getBoostersSubject(): Observable<IBoosters[]> {
    return this.boostersSubject.asObservable();
  }

  public getCards(boosterId: string): Observable<ICardsSet> {
    return this.http
      .get<ICardsSet>(`${this.apiBaseURL}/sets/${boosterId}/booster`)
      .pipe(map((response) => response));
  }

  public setCardsSubject(cardsData: ICardsOriginal[]): void {
    this.cardsSubject.next(cardsData);
  }

  public getCardsSubject(): Observable<ICardsOriginal[]> {
    return this.cardsSubject.asObservable();
  }
}
