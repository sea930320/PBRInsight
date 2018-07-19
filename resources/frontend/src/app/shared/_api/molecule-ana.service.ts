import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class MoleculeAnaService {
  moleculeAnaRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.moleculeAnaRoute = `${this.constants.APIURL}/molecule-analytics/`
  }

  moleculeShare(data) {
    const URL = this.moleculeAnaRoute + 'molecule-share';
    return this.http.post<any>(URL, data);
  }
}
