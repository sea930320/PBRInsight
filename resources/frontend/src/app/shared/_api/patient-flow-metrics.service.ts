import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class PatientFlowMetricsService {
  patientFlowMetricsRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.patientFlowMetricsRoute = `${this.constants.APIURL}/patient-flow-metrics/`
  }

  diseaseByBrand(data) {
    const URL = this.patientFlowMetricsRoute + 'disease-by-brand';
    return this.http.post<any>(URL, data);
  }

  diseaseByAtc(data) {
    const URL = this.patientFlowMetricsRoute + 'disease-by-atc';
    return this.http.post<any>(URL, data);
  }
}