import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class PermissionService {

  permissionRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.permissionRoute = `${this.constants.APIURL}/permission`
  }

  index() {
    return this.http.get<any>(this.permissionRoute);
  }

}
