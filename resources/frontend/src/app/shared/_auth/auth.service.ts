import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { GlobalConstants } from '../_constants/global.constants';
import { User } from '../_models/user'
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  API: string;

  constructor(private router: Router, private constants: GlobalConstants, private http: HttpClient) {
    this.API = this.constants.APIURL
  }

  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }

  signinUser(data: User) {
    const URL = `${this.API}/login`;
    return this.http.post<any>(URL, data)
      .map(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        return res.token;
      });
  }

  logout(redirectUrl: string = '') {
    localStorage.removeItem('token');
    this.router.navigate(['login'], {
      queryParams: {
        returnUrl: redirectUrl
      }
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return this.getToken();
  }
}
