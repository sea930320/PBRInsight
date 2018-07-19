import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class Atc2Service {
  atc2Route: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.atc2Route = `${this.constants.APIURL}/atc2`
  }

  index() {
    return this.http.get<any>(this.atc2Route);
  }
}
