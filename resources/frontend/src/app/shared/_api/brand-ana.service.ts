import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class BrandAnaService {
  brandAnaRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.brandAnaRoute = `${this.constants.APIURL}/brand-analytics/`
  }

  brandShare(data) {
    const URL = this.brandAnaRoute + 'brand-share';
    return this.http.post<any>(URL, data);
  }
}
