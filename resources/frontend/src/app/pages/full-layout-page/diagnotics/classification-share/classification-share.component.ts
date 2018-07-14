import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { DiagnoticsService } from '../../../../shared/_api/diagnotics.service';
import { DiagnoticsCommunicationService } from '../../../../shared/_communication/diagnotics.service';

import * as chartsData from '../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'classification-share',
  templateUrl: './classification-share.component.html',
  styleUrls: ['./classification-share.component.scss']
})
export class ClassificationShareComponent implements OnInit {

  // global Settings
  @ViewChild('classificationNS') classificationNS: NouisliderComponent
  years = null
  filter = {
    classification: "",
    start_year: "",
    start_quarater: "",
    end_year: "",
    end_quarater: ""
  }
  firstSelectEvent = true

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // dataTable Settings
  dataTableSettings = settings.classificationSettings;
  dataTableSource: LocalDataSource;

  // Share By Clinical Laboratory Specialty Chart  
  classification = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    shares: null,
    classifications: null,
    totalOccurence: null,
    initialChart: [],
    liveChart: []
  }

  // nouislider config
  classificationConfig: any = {
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

  constructor(private diagnoticsService: DiagnoticsService, private diagnoticsCommunicationService: DiagnoticsCommunicationService) { }

  ngOnInit() {
    this.fetchGlobalValues()
    this.fetchData()
  }

  fetchGlobalValues() {
    this.years = this.getYears(2016)
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
    this.changeFilter()
    this.classification.liveChart = []
    this.classification.initialChart = []
    this.classification.liveChartActivate = true;
    this.firstSelectEvent = true

    if (this.classification.timer) clearInterval(this.classification.timer);
    let { classification, ...filter } = this.filter
    this.diagnoticsService.classificationShare(filter)
      .subscribe((res: any) => {
        this.classification.classifications = []
        this.classification.shares = res.classificationShares
        this.classification.totalOccurence = res.total || 0

        for (var classification_name in this.classification.shares) {
          if (!this.classification.shares.hasOwnProperty(classification_name)) continue;
          if (!this.classification.shares[classification_name]) continue;
          this.classification.classifications.push(classification_name);
          var percentage = {
            'name': classification_name,
            'value': this.classification.shares[classification_name] ? (parseFloat(this.classification.shares[classification_name]) / this.classification.totalOccurence * 100).toFixed(2) : 0,
            'occurence': this.classification.shares[classification_name] ? this.classification.shares[classification_name] : 0,
          }
          this.classification.initialChart.push(percentage)
        }
        // nouislider draw
        this.classificationConfig.range.max = this.classification.initialChart.length - 1 || 1
        if (this.classificationNS) {
          this.classificationNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.classification.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.classification.initialChart)
        this.dataTableSource.load(this.classification.initialChart)
        // datachart redraw
        this.classification.drawChartStartPos = -1;
        this.classification.liveChartActivate = false;
        this.drawLiveChart();
        this.classification.timer = setInterval(this.drawLiveChart.bind(this), 5000);
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.classification.liveChartActivate) return;
    if (!force) {
      this.classification.drawChartStartPos++;
    }
    if (this.classification.drawChartStartPos > this.classification.initialChart.length - this.barChartSettings.barChartXSDisplayCount) {
      this.classification.drawChartStartPos = 0;
    }
    this.classification.liveChart = this.classification.initialChart.slice(this.classification.drawChartStartPos, this.classification.drawChartStartPos + this.barChartSettings.barChartXSDisplayCount);
  }

  onSelectChart(event) {
    this.filter.classification = event.name
    this.changeFilter()
  }

  onSelectTable(event) {
    if (this.firstSelectEvent) {
      this.firstSelectEvent = false
      return
    }
    this.filter.classification = event.data.name
    this.changeFilter()
  }

  changeFilter() {
    this.diagnoticsCommunicationService.changeFilterEmit(this.filter)
  }
}
