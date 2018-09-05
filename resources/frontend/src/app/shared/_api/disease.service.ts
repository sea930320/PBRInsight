import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class DiseaseService {
  diseaseRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.diseaseRoute = `${this.constants.APIURL}/disease`
  }

  index(data = { category: 'disease_prevalence' }) {
    return this.http.get<any>(this.diseaseRoute + '?category=' + data.category);
  }
}
