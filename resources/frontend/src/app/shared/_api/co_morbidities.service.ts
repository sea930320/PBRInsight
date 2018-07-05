import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class CoMorbiditiesService {
    coMorbiditiesRoute: string;

    constructor(private constants: GlobalConstants, private http: HttpClient) {
        this.coMorbiditiesRoute = `${this.constants.APIURL}/co-morbidities`
    }

    index(data) {
        const URL = this.coMorbiditiesRoute;
        return this.http.post<any>(URL, data);
    }
}