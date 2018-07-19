import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class BrandPriceService {
  brandPriceRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.brandPriceRoute = `${this.constants.APIURL}/brand-price/`
  }

  avgPrice(data) {
    const URL = this.brandPriceRoute + 'avg-price';
    return this.http.post<any>(URL, data);
  }
}
