import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoosterSearchService {
  constructor(private http: HttpClient) {}

  private apiURL = `https://api.magicthegathering.io/v1/sets`;

  public searchBoosters(
    queryName: string,
    queryBlock: string
  ): Observable<any> {
    let queryParams = new HttpParams().set('block', queryBlock);
    if (queryName) {
      queryParams = queryParams.set('name', queryName);
    }

    return this.http.get(this.apiURL, { params: queryParams });
  }
}
