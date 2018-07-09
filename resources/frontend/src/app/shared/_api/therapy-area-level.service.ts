import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class TherapyAreaLevelService {
  therapyAreaLevelRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.therapyAreaLevelRoute = `${this.constants.APIURL}/therapy-area-level-share`
  }

  byDisease(data) {
    const URL = `${this.therapyAreaLevelRoute}/by-disease`;
    return this.http.post<any>(URL, data);
  }

  byTherapyArea(data) {
    const URL = `${this.therapyAreaLevelRoute}/by-therapy-area`;
    return this.http.post<any>(URL, data);
  }
}
