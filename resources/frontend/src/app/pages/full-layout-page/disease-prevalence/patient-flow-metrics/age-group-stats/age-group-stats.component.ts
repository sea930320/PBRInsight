import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider/src/ng2-nouislider';

import { AgeGroupReportService } from '../../../../../shared/_api/age_group_report.service';

import { AgeGroupSettings } from './_settings.config'
import { PopulationSettings } from './_settings.config'

import * as chartsData from '../../../../../shared/_config/ngx-charts.config'

@Component({
  selector: 'age-group-stats',
  templateUrl: './age-group-stats.component.html',
  styleUrls: ['./age-group-stats.component.scss']
})
export class AgeGroupStatsComponent implements OnInit {
  // global Settings
  @Input() populations: any[];
  @ViewChild('populationNS') populationNS: NouisliderComponent
  initialData = {
    populations: null,
    ageGroup: null
  }
  filter = {
    start_year: 0,
    end_year: 0
  }
  selectedYears = {
    years: [],
    total_population: 0
  }

  // Line Charts
  lineChartSettings = chartsData.lineChartSettings;
  lineChartView: any[] = chartsData.lineChartView;

  // Population Chart
  populationChart = {
    timer: null,
    drawChartStartPos: -1,
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

  // dataTable Settings  
  ageGroupSettings = AgeGroupSettings;
  ageGroupDTSource: LocalDataSource;
  populationSettings = PopulationSettings;
  populationDTSource: LocalDataSource;

  // nouislider config
  populationConfig: any = {
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

  // constructor
  constructor(private ageGroupReportService: AgeGroupReportService) { }

  ngOnInit() {
    this.fetchPopulation();
  }

  fetchPopulation() {
    this.initialData.populations = this.populations
    this.initialData.populations.forEach((population) => {
      let populationSerie = {
        name: population.year.toString(),
        value: population.total_population
      }
      let growthRateSerie = {
        name: population.year.toString(),
        value: population.annual_growth_rate
      }
      this.populationChart.initialPopulationSeries.push(populationSerie);
      this.populationChart.initialGrowthRateSeries.push(growthRateSerie);
    })
    // nouislider draw
    this.populationConfig.range.max = this.populationChart.initialPopulationSeries.length
    if (this.populationNS) {
      this.populationNS.slider.updateOptions({
        range: {
          min: 0,
          max: this.populationChart.initialPopulationSeries.length
        }
      });
    }
    // datachart redraw
    this.populationChart.drawChartStartPos = -1;
    this.populationChart.liveChartActivate = false;
    this.drawPopulationLiveChart();
    this.populationChart.timer = setInterval(this.drawPopulationLiveChart.bind(this), 5000);
    // datatable draw
    this.populationDTSource = new LocalDataSource(this.initialData.populations)
    this.populationDTSource.load(this.initialData.populations)
    this.selectedYears = {
      years: [this.initialData.populations[0].year],
      total_population: this.initialData.populations[0].total_population
    }
    this.filter = {
      start_year: this.initialData.populations[0].year,
      end_year: this.initialData.populations[0].year
    }
  }

  drawPopulationLiveChart(force = false) {
    if (!force && this.populationChart.liveChartActivate) return;
    if (!force) {
      this.populationChart.drawChartStartPos++;
    }
    let displayCount = this.initialData.populations.length > this.lineChartSettings.lineChartDisplayCount * 2 ? this.lineChartSettings.lineChartDisplayCount : Math.floor(this.initialData.populations.length / 2)
    if (this.populationChart.drawChartStartPos > this.initialData.populations.length - displayCount) {
      this.populationChart.drawChartStartPos = 0;
    }
    this.populationChart.liveTotalChart[0].series = this.populationChart.initialPopulationSeries.slice(this.populationChart.drawChartStartPos, this.populationChart.drawChartStartPos + displayCount);
    this.populationChart.liveTotalChart = [...this.populationChart.liveTotalChart];
    this.populationChart.liveGrowthChart[0].series = this.populationChart.initialGrowthRateSeries.slice(this.populationChart.drawChartStartPos, this.populationChart.drawChartStartPos + displayCount);
    this.populationChart.liveGrowthChart = [...this.populationChart.liveGrowthChart];
  }

  fetchAgeGroupReport() {
    if (this.selectedYears.years.length === 0) return;
    this.ageGroupReportService.index()
      .subscribe((res: any) => {
        this.initialData.ageGroup = res.ageGroupReports
        let ageGroupReports = []
        res.ageGroupReports.forEach(ageGroupReport => {
          let agr = {
            age_group: ageGroupReport.age_group.range,
            male_percentage: ageGroupReport.male,
            male_population: Math.floor(ageGroupReport.male / 100.0 * this.selectedYears.total_population),
            female_percentage: ageGroupReport.female,
            female_population: Math.floor(ageGroupReport.female / 100.0 * this.selectedYears.total_population),
            total_percentage: ageGroupReport.total,
            total_population: Math.floor(ageGroupReport.total / 100.0 * this.selectedYears.total_population),
          }
          ageGroupReports.push(agr);
        })
        this.ageGroupDTSource = new LocalDataSource(ageGroupReports)
        this.ageGroupDTSource.load(ageGroupReports)
      });
  }

  changeFilter() {
    this.selectedYears = {
      years: [],
      total_population: 0
    }
    if (!this.filter.start_year && !this.filter.end_year) {
      return;
    }
    let startYear = this.filter.start_year || this.initialData.populations[0].year;
    let endYear = this.filter.end_year || this.initialData.populations[this.initialData.populations.length - 1].year;
    if (endYear < startYear) {
      endYear = startYear
      this.filter.end_year = endYear
    }
    while (startYear <= endYear) {
      this.selectedYears.years.push(startYear);
      let ele = this.initialData.populations.filter((e) => {
        return e.year === startYear
      })
      this.selectedYears.total_population += ele[0].total_population
      startYear++;
    }
    this.fetchAgeGroupReport();
  }

  onSelectPopulation(event) {
    this.filter.start_year = event.data.year
    this.filter.end_year = event.data.year
    this.changeFilter()
  }

  onSelectPopulationChart(event) {
    this.filter.start_year = parseInt(event.name)
    this.filter.end_year = parseInt(event.name)
    this.changeFilter()
  }

  convertToString(val) {
    return val.toString();
  }

  getYears(startYear) {
    var endYear = this.initialData.populations[this.initialData.populations.length - 1].year, years = [];
    startYear = startYear || this.initialData.populations[0].year;
    while (startYear <= endYear) {
      years.push(startYear++);
    }
    return years;
  }
}
