import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../_constants/global.constants';

@Injectable()
export class RssService {

  rssRoute: string;

  constructor(private constants: GlobalConstants, private http: HttpClient) {
    this.rssRoute = `${this.constants.APIURL}/rss`
  }

  feeds() {
    return this.http.get<any>(this.rssRoute + '/feeds');
  }
}
