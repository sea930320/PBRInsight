import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class Atc3Service {
  atc3Route: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.atc3Route = `${this.constants.APIURL}/atc3`
  }

  index() {
    return this.http.get<any>(this.atc3Route);
  }
}
