import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as chartsData from '../../shared/_config/ngx-charts.config'
import { LoginInfoService } from '../../shared/_api/login-info.service';
import { RssService } from '../../shared/_api/rss.service';
import { DashboardService } from '../../shared/_api/dashboard.service';

import { formatLabel } from '../../shared/_helpers/common';

@Pipe({ name: 'sanitizeHtml' })
export class SanitizeHtmlPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {

  }
  transform(html: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }
}

@Component({
  selector: 'app-full-layout-page',
  templateUrl: './full-layout-page.component.html',
  styleUrls: ['./full-layout-page.component.scss']
})
export class FullLayoutPageComponent implements OnInit {

  loginInfo = null;
  rssFeeds = []
  // Chart Data
  diseaseChart = [];
  diseaseCategoriesChart = [];

  treatmentMappingAtc2 = [];
  treatmentMappingAtc3 = [];

  marketSharebySegment = [];
  totalMarketShare = [];

  totalMarketAnaAtc1 = [];
  totalMarketAnaAtc2 = [];
  isLoaded = false

  // Area Charts
  areaChartView = chartsData.areaChartView;
  areaChartSettings = chartsData.areaChartSettings;

  // Bar Charts
  barChartView = chartsData.barChartView
  barChartSettings = chartsData.barChartSettings

  // Pie Charts
  pieChartSettings = chartsData.pieChartSettings;
  pieChartView: any[] = chartsData.pieChartView;

  constructor(private loginInfoService: LoginInfoService, private rssService: RssService, private dashboardService: DashboardService) { }
  ngOnInit() {
    this.loginInfoService.index()
      .subscribe((loginInfo: any) => {
        this.loginInfo = loginInfo
      });
    this.fetchRssFeeds();
    this.fetchData();
  }

  fetchRssFeeds() {
    this.rssService.feeds()
      .subscribe((rssFeeds: any) => {
        this.rssFeeds = rssFeeds
      });
  }

  fetchData() {
    this.dashboardService.index()
      .subscribe((res: any) => {
        this.diseaseChart = this.chartFormattingForMulti(res.diseaseChart, "Diseases");
        this.diseaseCategoriesChart = this.chartFormattingForMulti(res.diseaseCategoriesChart, "Disease Categories");
        this.treatmentMappingAtc2 = this.chartFormattingForSingle(res.treatmentMappingAtc2)
        this.treatmentMappingAtc3 = this.chartFormattingForSingle(res.treatmentMappingAtc3)
        this.marketSharebySegment = this.chartFormattingForSingle(res.marketSharebySegment)
        this.totalMarketShare = this.chartFormattingForSingle(res.totalMarketShare)
        this.totalMarketAnaAtc1 = this.chartFormattingForSingle(res.totalMarketAnaAtc1)
        this.totalMarketAnaAtc2 = this.chartFormattingForSingle(res.totalMarketAnaAtc2)
        this.isLoaded = true
      });
  }

  chartFormattingForMulti(data, name) {
    let chartObj = [
      {
        "name": name,
        "series": []
      }
    ]
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        chartObj[0].series.push({
          "name": key,
          "value": data[key]
        })
      }
    }
    return chartObj;
  }

  chartFormattingForSingle(data) {
    let chartObj = []
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        chartObj.push({
          "name": key,
          "value": data[key]
        })
      }
    }
    return chartObj;
  }

  pieTooltipText({ data }) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
  }
}
