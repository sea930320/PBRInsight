import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';


@Injectable()
export class DashboardService {
  dashboardRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.dashboardRoute = `${this.constants.APIURL}/dashboard`
  }

  index() {
    return this.http.get<any>(this.dashboardRoute);
  }

}
