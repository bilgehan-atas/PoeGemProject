import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

import altGemProbsJSON from '../../data/alt_gem_probs.json';
import altGemWeightsJSON from '../../data/alt_gem_weights.json';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  constructor(private http: HttpClient) {}

  getGemsNData(selectedLeague: string): Observable<any> {
    const gemsApiURL = `https://poe.ninja/api/data/itemoverview?league=${selectedLeague}&type=SkillGem&language=en`;
    return this.http.get(gemsApiURL).pipe(map((res) => res['lines']));
  }

  getCurrNData(selectedLeague: string): Observable<any> {
    const currApiURL = `https://poe.ninja/api/data/currencyoverview?league=${selectedLeague}&type=Currency&language=en`;
    return this.http.get(currApiURL).pipe(map((res) => res['lines']));
  }

  getAltGemsProb() {
    return of(altGemProbsJSON['gems']);
  }

  getAltGemsWeights() {
    return of(altGemWeightsJSON.flat());
  }
}
