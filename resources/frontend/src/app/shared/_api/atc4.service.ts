import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class Atc4Service {
  atc4Route: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.atc4Route = `${this.constants.APIURL}/atc4`
  }

  index() {
    return this.http.get<any>(this.atc4Route);
  }
}
