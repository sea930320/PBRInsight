import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class CostTreatmentService {
  costTreatmentRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.costTreatmentRoute = `${this.constants.APIURL}/cost-treatment`
  }

  index() {
    return this.http.get<any>(this.costTreatmentRoute);
  }
}
