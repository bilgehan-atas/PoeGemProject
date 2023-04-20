import { Injectable } from '@angular/core';
import { map, combineLatest } from 'rxjs';

import { FetchService } from './fetch.service';

import { gemTypes, regrading } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private fetchService: FetchService) {}

  selectedLeague: string = 'Standard'

  changeSelectedLeague(selectedLeague) {
    this.selectedLeague = selectedLeague
  }

  // // raw gem weights data
  // altGemsWeights$ = this.fetchService.getAltGemsWeights();

  // FETCH Uncorrupted alternate gems probability for REPEATING
  altGemsProb$ = this.fetchService.getAltGemsProb().pipe(
    map((data) => {
      return data.filter(
        (item) =>
          item.to_gem !== gemTypes.Superior &&
          !item.name.includes('Vaal') &&
          !item.name.includes('Elemental Penetration')
      );
    })
  );

  zaltGemsProb$ = this.fetchService.getAltGemsProb();

  // FETCH Uncorrupted alternate gems Ninja data
  getAltGemsNData(selectedLeague) {
    const altGemsNData$ = this.fetchService.getGemsNData(selectedLeague).pipe(
      map((data) => {
        return data.filter(
          (item) =>
            !item.corrupted &&
            (item.name.includes(gemTypes.Anomalous) ||
              item.name.includes(gemTypes.Divergent) ||
              item.name.includes(gemTypes.Phantasmal))
        );
      })
    );
    return altGemsNData$
  }

  // FETCH regrading lens values
  getRegradingLensValue(selectedLeague) {
    const regradingLensValue$ = this.fetchService.getCurrNData(selectedLeague).pipe(
      map((data) => {
        return data.filter(
          (item: any) =>
            item.currencyTypeName == regrading.prime ||
            item.currencyTypeName == regrading.secondary
        );
      })
    );
    return regradingLensValue$
  }

  // logic for altgems
  getAltGemsData(selectedLeague) {
    const regradingLensValue$ = this.getRegradingLensValue(selectedLeague);
    const altGemsNData$ = this.getAltGemsNData(selectedLeague)

    const altGemsData$ = combineLatest([
      this.altGemsProb$,
      altGemsNData$,
      regradingLensValue$,
    ]).pipe(
      map((res) => {
        const altGemsProb = res[0];
        const altGemsNData = res[1];
        const primeRegradingLensValue = res[2].find(
          (i) => i.currencyTypeName === regrading.prime
        ).chaosEquivalent;
        const secondaryRegradingLensValue = res[2].find(
          (i) => i.currencyTypeName === regrading.secondary
        ).chaosEquivalent;

        const combinedData = {
          lensValues: [
            {
              name: regrading.prime, value: primeRegradingLensValue
            },
            {
              name: regrading.secondary, value: secondaryRegradingLensValue
            }
          ]
        }
        const refinedGemData = [];
  
        altGemsProb.forEach((gem) => {
          const name = gem.to_gem + ' ' + gem.name;
          const valueList = altGemsNData.filter((i) => i.name === name);
          const value =
            valueList.length >= 1
              ? Math.min(...valueList.map((i) => i.chaosValue))
              : 0;
          const baseCostList = altGemsNData.filter(
            (i) => i.name === gem.from_gem + ' ' + gem.name
          );
          const baseCost =
            baseCostList.length >= 1 && gem.from_gem !== gemTypes.Superior
              ? Math.min(...baseCostList.map((i) => i.chaosValue))
              : 1;
          const costR = name.includes('Support')
            ? baseCost + secondaryRegradingLensValue * gem.r_tries
            : baseCost + primeRegradingLensValue * gem.r_tries;
          const costS = name.includes('Support')
            ? (baseCost + secondaryRegradingLensValue) * gem.s_tries
            : (baseCost + primeRegradingLensValue) * gem.s_tries;
  
          gem['fName'] = name;
          gem['bCost'] = baseCost ? baseCost : 0;
          gem['value'] = value ? value : 0;
          gem['costR'] = costR ? costR : 0;
          gem['costS'] = costS ? costS : 0;
          gem['profitR'] = value && baseCost ? value - costR : 0;
          gem['profitS'] = value && baseCost ? value - costS : 0;
  
          refinedGemData.push({
            fName: name,
            from_gem: gem.from_gem,
            method: 'Single',
            bCost: baseCost ? baseCost : 0,
            tries: gem.s_tries,
            cost: costS ? costS : 0,
            value: value ? value : 0,
            profit: value && baseCost ? value - costS : 0,
          });
  
          refinedGemData.push({
            fName: name,
            from_gem: gem.from_gem,
            method: 'Repeating',
            bCost: baseCost ? baseCost : 0,
            tries: gem.r_tries,
            cost: costR ? costR : 0,
            value: value ? value : 0,
            profit: value && baseCost ? value - costR : 0,
          });
        });

        combinedData['gemData'] = refinedGemData;
        return combinedData;
      })
    );

    return altGemsData$
  }
}
