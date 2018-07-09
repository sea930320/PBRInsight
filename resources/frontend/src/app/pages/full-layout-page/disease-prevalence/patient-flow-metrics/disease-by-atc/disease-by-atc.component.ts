import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider/src/ng2-nouislider';

import { PatientFlowMetricsService } from '../../../../../shared/_api/patient-flow-metrics.service';

import * as chartsData from '../../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'disease-by-atc',
  templateUrl: './disease-by-atc.component.html',
  styleUrls: ['./disease-by-atc.component.scss']
})
export class DiseaseByAtcComponent implements OnInit {
  // global Settings
  @Input() populations: any[];
  @Input() clinicTypes: any[];
  @ViewChild('atcNS') atcNS: NouisliderComponent
  years = null;
  atcLevels = [2, 3, 4, 5]
  selectedYears = {
    years: [],
    total_population: 0
  }

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // dataTable Settings
  dataTableSettings = settings.atcSettings;
  dataTableSource: LocalDataSource;

  // Disease By Atc Chart  
  atc = {
    timer: null,
    drawChartStartPos: 0,
    liveChartActivate: false,
    prevalences: null,
    atcs: null,
    totalOccurence: null,
    initialChart: [],
    liveChart: []
  }
  filter = {
    atc_level: 2,
    start_year: 0,
    end_year: 0
  }

  // nouislider config
  atcConfig: any = {
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
    this.selectedYears = {
      years: [this.populations[0].year],
      total_population: this.populations[0].total_population
    }
    this.filter.start_year = this.populations[0].year
    this.filter.end_year = this.populations[0].year

    this.fetchData()
  }

  public beforeChange($event: NgbTabChangeEvent) {
    let id = $event.nextId.replace('ATC-', '');
    this.filter.atc_level = parseInt(id);
    this.fetchData();
  }

  getYears(startYear) {
    var endYear = this.populations[this.populations.length - 1].year, years = [];
    startYear = startYear != 0 ? startYear : this.populations[0].year;
    while (startYear <= endYear) {
      years.push(startYear++);
    }
    return years;
  }

  fetchData() {
    this.atc.liveChart = []
    this.atc.initialChart = []
    this.atc.liveChartActivate = true;

    if (this.atc.timer) clearInterval(this.atc.timer);
    this.patientFlowMetricsService.diseaseByAtc(this.filter)
      .subscribe((res: any) => {
        this.atc.atcs = res.atcs
        this.atc.prevalences = res.atcPrevalences
        this.atc.totalOccurence = res.total || 1
        for (var atc_id in this.atc.atcs) {
          if (!this.atc.atcs.hasOwnProperty(atc_id)) continue;
          var percentage = {
            'name': this.atc.atcs[atc_id],
            'value': this.atc.prevalences[atc_id] ? (parseFloat(this.atc.prevalences[atc_id]) / this.atc.totalOccurence * 100).toFixed(2) : 0,
            'occurence': this.atc.prevalences[atc_id] ? this.atc.prevalences[atc_id] : 0,
            'brand_id': atc_id,
            'population': Math.floor(parseFloat(this.atc.prevalences[atc_id]) / this.atc.totalOccurence * this.selectedYears.total_population)
          }
          this.atc.initialChart.push(percentage)
        }
        // nouislider draw
        this.atcConfig.range.max = this.atc.initialChart.length
        if (this.atcNS) {
          this.atcNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.atc.initialChart.length
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.atc.initialChart)
        this.dataTableSource.load(this.atc.initialChart)
        // datachart redraw
        this.atc.drawChartStartPos = 0;
        this.atc.liveChartActivate = false;
        this.drawLiveChart();
        this.atc.timer = setInterval(this.drawLiveChart.bind(this), 5000);
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.atc.liveChartActivate) return;
    if (!force) {
      this.atc.drawChartStartPos++;
    }
    let displayCount = this.atc.initialChart.length > this.barChartSettings.barChartDisplayCount * 2 ? this.barChartSettings.barChartDisplayCount : Math.floor(this.atc.initialChart.length / 2)

    if (this.atc.drawChartStartPos > this.atc.initialChart.length - displayCount) {
      this.atc.drawChartStartPos = 0;
    }
    this.atc.liveChart = this.atc.initialChart.slice(this.atc.drawChartStartPos, this.atc.drawChartStartPos + displayCount);
  }

  changeFilter() {
    debugger
    this.selectedYears = {
      years: [],
      total_population: 0
    }
    let startYear = (this.filter.start_year != 0) ? this.filter.start_year : this.populations[0].year;
    let endYear = (this.filter.end_year != 0) ? this.filter.end_year : this.populations[this.populations.length - 1].year;
    if (endYear < startYear) {
      endYear = startYear
      this.filter.end_year = endYear
    }
    while (startYear <= endYear) {
      this.selectedYears.years.push(startYear);
      let ele = this.populations.filter((e) => {
        return e.year === startYear
      })
      this.selectedYears.total_population += ele[0].total_population
      startYear++;
    }
    this.fetchData();
  }
}
