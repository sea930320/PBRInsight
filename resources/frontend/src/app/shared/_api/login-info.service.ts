import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class LoginInfoService {
  loginInfoRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.loginInfoRoute = `${this.constants.APIURL}/login-info`
  }

  index() {
    return this.http.get<any>(this.loginInfoRoute);
  }
}
