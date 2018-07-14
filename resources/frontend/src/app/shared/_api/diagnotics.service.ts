import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class DiagnoticsService {
  diagnoticsRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.diagnoticsRoute = `${this.constants.APIURL}/diagnotics/`
  }

  classificationShare(data) {
    const URL = this.diagnoticsRoute + 'classification-share';
    return this.http.post<any>(URL, data);
  }

  subAna1Share(data) {
    const URL = this.diagnoticsRoute + 'sub-ana1-share';
    return this.http.post<any>(URL, data);
  }

  subAna2Share(data) {
    const URL = this.diagnoticsRoute + 'sub-ana2-share';
    return this.http.post<any>(URL, data);
  }

  clinicShare(data) {
    const URL = this.diagnoticsRoute + 'clinic-share';
    return this.http.post<any>(URL, data);
  }

  facilityShare(data) {
    const URL = this.diagnoticsRoute + 'facility-share';
    return this.http.post<any>(URL, data);
  }
}
