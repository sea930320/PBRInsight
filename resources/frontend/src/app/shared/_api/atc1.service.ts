import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class Atc1Service {
  atc1Route: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.atc1Route = `${this.constants.APIURL}/atc1`
  }

  index() {
    return this.http.get<any>(this.atc1Route);
  }
}
