import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class DiseasePrevalenceService {
  diseasePrevalenceRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.diseasePrevalenceRoute = `${this.constants.APIURL}/disease-prevalence/`
  }

  individualDisease(data) {
    const URL = this.diseasePrevalenceRoute + 'individual-disease';
    return this.http.post<any>(URL, data);
  }

  category(data) {
    const URL = this.diseasePrevalenceRoute + 'category';
    return this.http.post<any>(URL, data);
  }

  diseaseByCategory(data) {
    const URL = this.diseasePrevalenceRoute + 'disease-by-category';
    return this.http.post<any>(URL, data);
  }
}