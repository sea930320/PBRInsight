import { Component, OnInit } from '@angular/core';

import * as chartsSource from './ngxchart';
import * as chartsData from '../../shared/_config/ngx-charts.config'
import { LoginInfoService } from '../../shared/_api/login-info.service';

@Component({
  selector: 'app-full-layout-page',
  templateUrl: './full-layout-page.component.html',
  styleUrls: ['./full-layout-page.component.scss']
})
export class FullLayoutPageComponent implements OnInit {

  loginInfo = null;
  //Chart Data
  diseaseChart = chartsSource.diseaseChart;
  diseaseCategoriesChart = chartsSource.diseaseCategoriesChart;
  
  //Area Charts
  areaChartView = chartsData.areaChartView;
  areaChartSettings = chartsData.areaChartSettings;

  constructor(private loginInfoService: LoginInfoService) { }
  ngOnInit() {
    this.loginInfoService.index()
      .subscribe((loginInfo: any) => {
        this.loginInfo = loginInfo
      });
  }
}
