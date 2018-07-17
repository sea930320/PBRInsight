import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class MarketViewService {
  marketViewRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.marketViewRoute = `${this.constants.APIURL}/market-view/`
  }

  totalMarketValuation(data = {}) {
    const URL = this.marketViewRoute + 'total-market-valuation';
    return this.http.post<any>(URL, data);
  }
  
  marketShareBySegment(data) {
    const URL = this.marketViewRoute + 'market-share-by-segment';
    return this.http.post<any>(URL, data);
  }

  atc1Share(data) {
    const URL = this.marketViewRoute + 'atc1-share';
    return this.http.post<any>(URL, data);
  }

  atc2Share(data) {
    const URL = this.marketViewRoute + 'atc2-share';
    return this.http.post<any>(URL, data);
  }
}
