import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class Atc5Service {
  atc5Route: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.atc5Route = `${this.constants.APIURL}/atc5`
  }

  index() {
    return this.http.get<any>(this.atc5Route);
  }
}
