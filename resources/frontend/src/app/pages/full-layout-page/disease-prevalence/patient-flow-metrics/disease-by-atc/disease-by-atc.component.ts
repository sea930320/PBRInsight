import { Component, Input, ViewChild, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { PatientFlowMetricsService } from '../../../../../shared/_api/patient-flow-metrics.service';

import * as chartsData from '../../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'disease-by-atc',
  templateUrl: './disease-by-atc.component.html',
  styleUrls: ['./disease-by-atc.component.scss']
})
export class DiseaseByAtcComponent implements OnChanges {
  // global Settings
  @Input() population: any;
  @Input() parentFilter: any;
  @ViewChild('atcNS') atcNS: NouisliderComponent

  atcLevels = [2, 3, 4, 5]
  filter = {
    atc_level: 2,
    start_year: 0,
    end_year: 0,
    disease_id: ""
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

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.hasOwnProperty('parentFilter') || changes.parentFilter.firstChange) return;
    this.filter.start_year = this.parentFilter.start_year
    this.filter.end_year = this.parentFilter.end_year
    this.filter.disease_id = this.parentFilter.disease_id
    this.fetchData();
  }

  public beforeChange($event: NgbTabChangeEvent) {
    let id = $event.nextId.replace('ATC-', '');
    this.filter.atc_level = parseInt(id);
    this.fetchData();
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
          if (!this.atc.prevalences[atc_id]) continue;
          var percentage = {
            'name': this.atc.atcs[atc_id],
            'value': this.atc.prevalences[atc_id] ? (parseFloat(this.atc.prevalences[atc_id]) / this.atc.totalOccurence * 100).toFixed(2) : 0,
            'occurence': this.atc.prevalences[atc_id] ? this.atc.prevalences[atc_id] : 0,
            'brand_id': atc_id,
            'population': Math.floor(parseFloat(this.atc.prevalences[atc_id]) / this.atc.totalOccurence * this.population)
          }
          this.atc.initialChart.push(percentage)
        }
        // nouislider draw
        this.atcConfig.range.max = this.atc.initialChart.length - 1 || 1
        if (this.atcNS) {
          this.atcNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.atc.initialChart.length - 1 || 1
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

    if (this.atc.drawChartStartPos > this.atc.initialChart.length - this.barChartSettings.barChartSMDisplayCount) {
      this.atc.drawChartStartPos = 0;
    }
    this.atc.liveChart = this.atc.initialChart.slice(this.atc.drawChartStartPos, this.atc.drawChartStartPos + this.barChartSettings.barChartSMDisplayCount);
  }
}
