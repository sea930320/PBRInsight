import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { PatientFlowMetricsService } from '../../../../../shared/_api/patient-flow-metrics.service';

import * as chartsData from '../../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'disease-by-brand',
  templateUrl: './disease-by-brand.component.html',
  styleUrls: ['./disease-by-brand.component.scss']
})
export class DiseaseByBrandComponent implements OnInit {
  // global Settings
  @Input() clinicTypes: any[];
  @ViewChild('brandNS') brandNS: NouisliderComponent
  years = null
  filter = {
    start_year: "",
    start_quarater: "",
    end_year: "",
    end_quarater: "",
    clinic_type_id: ""
  }

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // dataTable Settings
  dataTableSettings = settings.brandSettings;
  dataTableSource: LocalDataSource;

  // Disease By Brand Chart  
  brand = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    prevalences: null,
    brands: null,
    totalOccurence: null,
    initialChart: [],
    liveChart: []
  }

  // nouislider config
  brandConfig: any = {
    range: {
      min: 0,
      max: 0
    },
    step: 1,
    connect: true,
    tooltips: true,
    pips: {
      mode: 'positions',
      values: [0, 100],
      density: 1
    }
  }

  constructor(private patientFlowMetricsService: PatientFlowMetricsService) { }

  ngOnInit() {
    this.years = this.getYears(2016)
    this.fetchData()
  }

  getYears(startYear) {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(currentYear--);
    }
    return years;
  }

  fetchData() {
    this.brand.liveChart = []
    this.brand.initialChart = []
    this.brand.liveChartActivate = true;

    if (this.brand.timer) clearInterval(this.brand.timer);
    this.patientFlowMetricsService.diseaseByBrand(this.filter)
      .subscribe((res: any) => {
        this.brand.brands = res.brands
        this.brand.prevalences = res.brandPrevalences
        this.brand.totalOccurence = res.total || 1
        this.brand.initialChart.push({
          'name': 'Unbranded',
          'value': this.brand.prevalences[''] ? (parseFloat(this.brand.prevalences['']) / this.brand.totalOccurence * 100).toFixed(2) : 0,
          'occurence': this.brand.prevalences[''] ? this.brand.prevalences[''] : 0,
          'brand_id': 'NaN'
        })
        for (var brand_id in this.brand.brands) {
          if (!this.brand.brands.hasOwnProperty(brand_id)) continue;
          var percentage = {
            'name': this.brand.brands[brand_id],
            'value': this.brand.prevalences[brand_id] ? (parseFloat(this.brand.prevalences[brand_id]) / this.brand.totalOccurence * 100).toFixed(2) : 0,
            'occurence': this.brand.prevalences[brand_id] ? this.brand.prevalences[brand_id] : 0,
            'brand_id': brand_id
          }
          this.brand.initialChart.push(percentage)
        }
        // nouislider draw
        this.brandConfig.range.max = this.brand.initialChart.length - 1 || 1
        if (this.brandNS) {
          this.brandNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.brand.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.brand.initialChart)
        this.dataTableSource.load(this.brand.initialChart)
        // datachart redraw
        this.brand.drawChartStartPos = -1;
        this.brand.liveChartActivate = false;
        this.drawLiveChart();
        this.brand.timer = setInterval(this.drawLiveChart.bind(this), 5000);
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.brand.liveChartActivate) return;
    if (!force) {
      this.brand.drawChartStartPos++;
    }

    let displayCount = this.brand.initialChart.length > this.barChartSettings.barChartDisplayCount * 2 ? this.barChartSettings.barChartDisplayCount : Math.floor(this.brand.initialChart.length / 2)
    if (this.brand.drawChartStartPos > this.brand.initialChart.length - displayCount) {
      this.brand.drawChartStartPos = 0;
    }
    this.brand.liveChart = this.brand.initialChart.slice(this.brand.drawChartStartPos, this.brand.drawChartStartPos + displayCount);
  }
}
