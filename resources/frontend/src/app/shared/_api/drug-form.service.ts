import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class DrugFormService {
  drugFormRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.drugFormRoute = `${this.constants.APIURL}/drug-form`
  }

  index() {
    return this.http.get<any>(this.drugFormRoute);
  }
}