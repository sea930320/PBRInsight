import { Component, OnInit } from '@angular/core';

import { PopulationService } from '../../../../shared/_api/population.service';
import { AgeGroupReportService } from '../../../../shared/_api/age_group_report.service';
import { ClinicTypeService } from '../../../../shared/_api/clinic_type.service';

import * as chartsData from '../../../../shared/_config/ngx-charts.config'

@Component({
  selector: 'app-patient-flow-metrics',
  templateUrl: './patient-flow-metrics.component.html',
  styleUrls: ['./patient-flow-metrics.component.scss']
})
export class PatientFlowMetricsComponent implements OnInit {
  // global Settings
  years = null
  clinicTypes = []
  // Line Charts
  lineChartSettings = chartsData.lineChartSettings;
  lineChartView: any[] = chartsData.lineChartView;

  // Population Chart
  populations = {
    initialData: [],
    timer: null,
    drawChartStartPos: 0,
    liveChartActivate: false,
    initialPopulationSeries: [],
    initialGrowthRateSeries: [],
    liveTotalChart: [
      {
        'name': 'Popoulation',
        'series': [],
      }
    ],
    liveGrowthChart: [
      {
        'name': 'Annual Growth Rate',
        'series': []
      }
    ]
  }

  // AgeGroupReport Chart
  ageGroupReports = {
    initialData: [],
    timer: null,
    drawChartStartPos: 0,
    liveChartActivate: false,
    initialMaleSeries: [],
    initialFemaleSeries: [],
    initialTotalSeries: [],
    liveChart: [
      {
        'name': 'Male',
        'series': [],
      },
      {
        'name': 'Female',
        'series': [],
      },
      {
        'name': 'Total',
        'series': [],
      }
    ],
  }
  // constructor
  constructor(private populationService: PopulationService, private ageGroupReportService: AgeGroupReportService, private clinicTypeService: ClinicTypeService) { }

  ngOnInit() {
    this.fetchClinicType()
    this.fetchPopulation()
    this.fetchAgeGroupReport();
  }

  fetchClinicType() {
    this.clinicTypes = []
    this.clinicTypeService.index()
      .subscribe((res: any) => {
        this.clinicTypes = res.clinic_types
      });
  }

  fetchPopulation() {
    if (this.populations.timer) clearInterval(this.populations.timer);
    this.populationService.index()
      .subscribe((res: any) => {
        this.populations.initialData = res.populations
        res.populations.forEach((population) => {
          let populationSerie = {
            name: population.year.toString(),
            value: population.total_population
          }
          let growthRateSerie = {
            name: population.year.toString(),
            value: population.annual_growth_rate
          }
          this.populations.initialPopulationSeries.push(populationSerie);
          this.populations.initialGrowthRateSeries.push(growthRateSerie);
        })
        // datachart redraw
        this.populations.drawChartStartPos = 0;
        this.populations.liveChartActivate = false;
        this.drawPopulationLiveChart();
        this.populations.timer = setInterval(this.drawPopulationLiveChart.bind(this), 5000);
      });
  }

  drawPopulationLiveChart() {
    if (this.populations.liveChartActivate) return;
    let displayCount = this.populations.initialData.length > this.lineChartSettings.lineChartDisplayCount * 2 ? this.lineChartSettings.lineChartDisplayCount : Math.floor(this.populations.initialData.length / 2)
    if (this.populations.drawChartStartPos > this.populations.initialData.length - displayCount) {
      this.populations.drawChartStartPos = 0;
    }
    this.populations.liveTotalChart[0].series = this.populations.initialPopulationSeries.slice(this.populations.drawChartStartPos, this.populations.drawChartStartPos + displayCount);
    this.populations.liveTotalChart = [...this.populations.liveTotalChart];
    this.populations.liveGrowthChart[0].series = this.populations.initialGrowthRateSeries.slice(this.populations.drawChartStartPos, this.populations.drawChartStartPos + displayCount);
    this.populations.liveGrowthChart = [...this.populations.liveGrowthChart];
    this.populations.drawChartStartPos++;
  }

  fetchAgeGroupReport() {
    if (this.ageGroupReports.timer) clearInterval(this.ageGroupReports.timer);
    this.ageGroupReportService.index()
      .subscribe((res: any) => {
        this.ageGroupReports.initialData = res.ageGroupReports
        res.ageGroupReports.forEach((ageGroupReport) => {
          let maleSerie = {
            name: ageGroupReport.age_group.range,
            value: ageGroupReport.male
          }
          let femaleSerie = {
            name: ageGroupReport.age_group.range,
            value: ageGroupReport.female
          }
          let totalSerie = {
            name: ageGroupReport.age_group.range,
            value: ageGroupReport.total
          }
          this.ageGroupReports.initialMaleSeries.push(maleSerie);
          this.ageGroupReports.initialFemaleSeries.push(femaleSerie);
          this.ageGroupReports.initialTotalSeries.push(totalSerie);
        })
        // datachart redraw
        this.ageGroupReports.drawChartStartPos = 0;
        this.ageGroupReports.liveChartActivate = false;
        this.drawAgeGroupLiveChart();
        this.ageGroupReports.timer = setInterval(this.drawAgeGroupLiveChart.bind(this), 5000);
      });
  }

  drawAgeGroupLiveChart() {
    if (this.ageGroupReports.liveChartActivate) return;
    let displayCount = this.ageGroupReports.initialData.length > this.lineChartSettings.lineChartDisplayCount * 2 ? this.lineChartSettings.lineChartDisplayCount : Math.floor(this.ageGroupReports.initialData.length / 2)
    if (this.ageGroupReports.drawChartStartPos > this.ageGroupReports.initialData.length - displayCount) {
      this.ageGroupReports.drawChartStartPos = 0;
    }
    this.ageGroupReports.liveChart[0].series = this.ageGroupReports.initialMaleSeries.slice(this.ageGroupReports.drawChartStartPos, this.ageGroupReports.drawChartStartPos + displayCount);
    this.ageGroupReports.liveChart[1].series = this.ageGroupReports.initialFemaleSeries.slice(this.ageGroupReports.drawChartStartPos, this.ageGroupReports.drawChartStartPos + displayCount);
    this.ageGroupReports.liveChart[2].series = this.ageGroupReports.initialTotalSeries.slice(this.ageGroupReports.drawChartStartPos, this.ageGroupReports.drawChartStartPos + displayCount);
    this.ageGroupReports.liveChart = [...this.ageGroupReports.liveChart];
    this.ageGroupReports.drawChartStartPos++;
  }

  convertToString(val) {
    return val.toString();
  }
}
