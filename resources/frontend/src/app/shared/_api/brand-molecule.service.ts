import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class BrandMoleculeService {

  brandMoleculeRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.brandMoleculeRoute = `${this.constants.APIURL}/brand-molecule/`
  }

  brandShare(data) {
    const URL = this.brandMoleculeRoute + 'brand-share';
    return this.http.post<any>(URL, data);
  }
}
