import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class AgeGroupReportService {
    ageGropuReportRoute: string;

    constructor(private constants: GlobalConstants, private http: HttpClient) {
        this.ageGropuReportRoute = `${this.constants.APIURL}/age-group-report`
    }

    index() {
        return this.http.get<any>(this.ageGropuReportRoute);
    }
}