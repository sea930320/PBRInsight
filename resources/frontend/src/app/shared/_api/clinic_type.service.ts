import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class ClinicTypeService {
    clinicTypeRoute: string;

    constructor(private constants: GlobalConstants, private http: HttpClient) {
        this.clinicTypeRoute = `${this.constants.APIURL}/clinic-type`
    }

    index() {
        return this.http.get<any>(this.clinicTypeRoute);
    }
}