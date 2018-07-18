import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class TherapyAreaAnaService {
  therapyAreaAnaRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.therapyAreaAnaRoute = `${this.constants.APIURL}/therapy-area-analytics/`
  }

  atc2Share(data) {
    const URL = this.therapyAreaAnaRoute + 'atc2-share';
    return this.http.post<any>(URL, data);
  }

  atc4Share(data) {
    const URL = this.therapyAreaAnaRoute + 'atc4-share';
    return this.http.post<any>(URL, data);
  }

  atc5Share(data) {
    const URL = this.therapyAreaAnaRoute + 'atc5-share';
    return this.http.post<any>(URL, data);
  }
}
