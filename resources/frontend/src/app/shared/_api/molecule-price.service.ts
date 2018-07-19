import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class MoleculePriceService {
  moleculePriceRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.moleculePriceRoute = `${this.constants.APIURL}/molecule-price/`
  }

  avgPrice(data) {
    const URL = this.moleculePriceRoute + 'avg-price';
    return this.http.post<any>(URL, data);
  }

  avgPriceByAc(data) {
    const URL = this.moleculePriceRoute + 'avg-price-by-ac';
    return this.http.post<any>(URL, data);
  }
}
