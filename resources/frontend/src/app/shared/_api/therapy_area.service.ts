import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class TherapyAreaService {
    therapyAreaRoute: string;

    constructor(private constants: GlobalConstants, private http: HttpClient) {
        this.therapyAreaRoute = `${this.constants.APIURL}/therapy-area`
    }

    index(data = { category: "disease_prevalence" }) {
        return this.http.get<any>(this.therapyAreaRoute + '?category=' + data.category);
    }

    show(id) {
        return this.http.get<any>(this.therapyAreaRoute + '/' + id);
    }
}