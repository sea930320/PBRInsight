import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class PopulationService {
    populationRoute: string;

    constructor(private constants: GlobalConstants, private http: HttpClient) {
        this.populationRoute = `${this.constants.APIURL}/population`
    }

    index() {
        return this.http.get<any>(this.populationRoute);
    }
}