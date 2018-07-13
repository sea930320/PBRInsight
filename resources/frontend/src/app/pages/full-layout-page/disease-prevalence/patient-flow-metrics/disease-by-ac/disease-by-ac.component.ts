import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { PatientFlowMetricsService } from '../../../../../shared/_api/patient-flow-metrics.service';
import { DiseaseService } from '../../../../../shared/_api/disease.service';
import { PopulationService } from '../../../../../shared/_api/population.service';
import { GlobalConstants } from '../../../../../shared/_constants/global.constants';
import { _getYears } from '../../../../../shared/_helpers/common'

import * as chartsData from '../../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'disease-by-ac',
  templateUrl: './disease-by-ac.component.html',
  styleUrls: ['./disease-by-ac.component.scss']
})
export class DiseaseByAcComponent implements OnInit {

  // global Settings
  @ViewChild('acNS') acNS: NouisliderComponent
  isLoaded = false
  selectedYears = {
    years: [],
    total_population: 0
  }
  diseases = []
  populations = []
  getYears = _getYears
  filter = {
    start_year: 0,
    end_year: 0,
    disease_id: ""
  }
  totalTb = 1
  populationByDisease = 0

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // dataTable Settings
  dataTableSettings = settings.acSettings;
  dataTableSource: LocalDataSource;

  // Disease By Ac Chart  
  ac = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    prevalences: null,
    acs: null,
    totalOccurence: null,
    initialChart: [],
    liveChart: []
  }

  // nouislider config
  acConfig: any = {
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

  constructor(private populationService: PopulationService, private constants: GlobalConstants, private patientFlowMetricsService: PatientFlowMetricsService, private diseaseService: DiseaseService) { }

  ngOnInit() {
    this.fetchGlobalValues()
  }

  fetchGlobalValues() {
    this.diseases = []
    this.populations = []
    let values$ = combineLatest(
      this.diseaseService.index(),
      this.populationService.index(),
      (first, second) => {
        return { first, second };
      }
    );
    values$.subscribe((res: any) => {
      this.diseases = res.first.diseases
      this.populations = res.second.populations
      this.selectedYears = {
        years: [this.populations[0].year],
        total_population: this.populations[0].total_population
      }
      this.filter.start_year = this.populations[0].year
      this.filter.end_year = this.populations[0].year
      this.fetchData()

      this.isLoaded = true
    });
  }

  fetchData() {
    this.ac.liveChart = []
    this.ac.initialChart = []
    this.ac.liveChartActivate = true;

    if (this.ac.timer) clearInterval(this.ac.timer);
    this.patientFlowMetricsService.diseaseByAc(this.filter)
      .subscribe((res: any) => {
        this.ac.acs = []
        this.ac.prevalences = res.acPrevalences
        this.ac.totalOccurence = res.total || 0
        this.totalTb = res.total_tb || 1

        for (var ac_name in this.ac.prevalences) {
          if (!this.ac.prevalences.hasOwnProperty(ac_name)) continue;
          if (!this.ac.prevalences[ac_name]) continue;
          this.ac.acs.push(ac_name);
          var percentage = {
            'name': ac_name,
            'value': this.ac.prevalences[ac_name] ? (parseFloat(this.ac.prevalences[ac_name]) / this.ac.totalOccurence * 100).toFixed(2) : 0,
            'occurence': this.ac.prevalences[ac_name] ? this.ac.prevalences[ac_name] : 0,
          }
          this.ac.initialChart.push(percentage)
        }
        // nouislider draw
        this.acConfig.range.max = this.ac.initialChart.length - 1 || 1
        if (this.acNS) {
          this.acNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.ac.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.ac.initialChart)
        this.dataTableSource.load(this.ac.initialChart)
        // datachart redraw
        this.ac.drawChartStartPos = -1;
        this.ac.liveChartActivate = false;
        this.drawLiveChart();
        this.ac.timer = setInterval(this.drawLiveChart.bind(this), 5000);
        //emit event to child
        this.populationByDisease = Math.floor(this.selectedYears.total_population * (this.ac.totalOccurence / this.totalTb));
        this.filter = { ...this.filter };
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.ac.liveChartActivate) return;
    if (!force) {
      this.ac.drawChartStartPos++;
    }
    if (this.ac.drawChartStartPos > this.ac.initialChart.length - this.barChartSettings.barChartSMDisplayCount) {
      this.ac.drawChartStartPos = 0;
    }
    this.ac.liveChart = this.ac.initialChart.slice(this.ac.drawChartStartPos, this.ac.drawChartStartPos + this.barChartSettings.barChartSMDisplayCount);
  }

  changeFilter() {
    this.selectedYears = {
      years: [],
      total_population: 0
    }
    let startYear = this.filter.start_year || this.populations[0].year;
    let endYear = this.filter.end_year || this.populations[this.populations.length - 1].year;
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
