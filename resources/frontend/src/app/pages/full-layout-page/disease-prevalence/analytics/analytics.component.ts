import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { DiseasePrevalenceService } from '../../../../shared/_api/disease_prevalence.service';
import { ClinicTypeService } from '../../../../shared/_api/clinic_type.service';
import * as chartsData from '../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  // global Settings
  years = null
  clinicTypes = []
  @ViewChild('individualNS') individualNS: NouisliderComponent
  @ViewChild('categoryNS') categoryNS: NouisliderComponent
  @ViewChild('diseaesByCategoryNS') diseaesByCategoryNS: NouisliderComponent
  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;
  // Pie Charts
  pieChartSettings = chartsData.pieChartSettings;
  pieChartView: any[] = chartsData.pieChartView;
  // dataTable Settings
  categorySettings = settings.categorySettings;
  individualSettings = settings.individualSettings;
  individualSource: LocalDataSource;
  categorySource: LocalDataSource;

  // Individual Chart  
  individual = {
    prevalences: null,
    diseases: null,
    totalOccurence: null,
    initialChart: [],
    liveChart: []
  }
  individualFilter = {
    start_year: "",
    start_quarater: "",
    end_year: "",
    end_quarater: "",
    clinic_type_id: ""
  }
  individualTimer = null
  individualDrawChartStop = false
  individualDrawChartStart = -1
  // nouislider config
  individualConfig: any = {
    range: {
      min: 0,
      max: 0
    },
    padding: 0,
    step: 1,
    connect: true,
    tooltips: true,
    pips: {
      mode: 'positions',
      values: [0, 25, 50, 75, 100],
      density: 4
    }
  }
  // Disease Category(Therapy Area) Chart  
  category = {
    prevalences: null,
    therapyAreas: null,
    totalOccurence: null,
    initialChart: [],
    liveChart: []
  }
  categoryFilter = {
    start_year: "",
    start_quarater: "",
    end_year: "",
    end_quarater: "",
    clinic_type_id: ""
  }
  categoryTimer = null
  categoryDrawChartStop = false
  categoryDrawChartStart = -1
  // nouislider config
  categoryConfig: any = {
    range: {
      min: 0,
      max: 0
    },
    padding: 0,
    step: 1,
    connect: true,
    tooltips: true,
    pips: {
      mode: 'positions',
      values: [0, 100],
      density: 1
    }
  }
  // Individual Disease By Category(Therapy Area) Chart
  therapyArea = {
    id: null,
    name: ""
  }
  diseaseByCategorySource: LocalDataSource;
  diseaseByCategory = {
    prevalences: null,
    diseases: null,
    totalOccurence: null,
    initialChart: [],
    liveChart: []
  }
  diseaseByCategoryFilter = {
    therapy_area_id: null,
    start_year: "",
    start_quarater: "",
    end_year: "",
    end_quarater: "",
    clinic_type_id: ""
  }
  diseaseByCategoryTimer = null
  diseaseByCategoryDrawChartStop = false
  diseaseByCategoryDrawChartStart = -1
  // nouislider config
  diseaseByCategoryConfig: any = {
    range: {
      min: 0,
      max: 0
    },
    padding: 0,
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
  constructor(private diseasePrevalenceService: DiseasePrevalenceService, private clinicTypeService: ClinicTypeService) { }

  ngOnInit() {
    this.years = this.getYears(2016)
    this.fetchClinicType()
    this.fetchIndividualData()
    this.fetchCategoryData()
  }

  getYears(startYear) {
    var currentYear = new Date().getFullYear() - 1, years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(currentYear--);
    }
    return years;
  }

  fetchClinicType() {
    this.clinicTypes = []
    this.clinicTypeService.index()
      .subscribe((res: any) => {
        this.clinicTypes = res.clinic_types
      });
  }

  fetchIndividualData() {
    this.individual.liveChart = []
    this.individualDrawChartStop = true;
    if (this.individualTimer) clearInterval(this.individualTimer);
    this.diseasePrevalenceService.individualDisease(this.individualFilter)
      .subscribe((res: any) => {
        this.individual = {
          initialChart: [],
          liveChart: [],
          diseases: res.individualDiseases,
          prevalences: res.individualPrevalences,
          totalOccurence: res.total || 1
        }
        for (var disease_id in this.individual.diseases) {
          if (!this.individual.diseases.hasOwnProperty(disease_id)) continue;
          if (!this.individual.prevalences[disease_id]) continue;
          var percentage = {
            'name': this.individual.diseases[disease_id],
            'value': this.individual.prevalences[disease_id] ? (parseFloat(this.individual.prevalences[disease_id]) / this.individual.totalOccurence * 100).toFixed(2) : 0,
            'occurence': this.individual.prevalences[disease_id] ? this.individual.prevalences[disease_id] : 0,
            'disease_id': disease_id
          }
          this.individual.initialChart.push(percentage)
        }
        // nouislider draw
        this.individualConfig.range.max = this.individual.initialChart.length - 1 || 1
        if (this.individualNS) {
          this.individualNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.individual.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.individualSource = new LocalDataSource(this.individual.initialChart)
        this.individualSource.load(this.individual.initialChart)
        // datachart redraw
        this.individualDrawChartStart = -1;
        this.individualDrawChartStop = false;
        this.drawIndividualLiveChart();
        this.individualTimer = setInterval(this.drawIndividualLiveChart.bind(this), 5000);
      });
  }

  fetchCategoryData() {
    this.category.liveChart = []
    this.categoryDrawChartStop = true;
    if (this.categoryTimer) clearInterval(this.categoryTimer);
    this.diseasePrevalenceService.category(this.categoryFilter)
      .subscribe((res: any) => {
        this.category = {
          initialChart: [],
          liveChart: [],
          therapyAreas: res.therapyAreas,
          prevalences: res.therapyAreaPrevalences,
          totalOccurence: res.total || 1
        }
        for (var therapy_area_id in this.category.therapyAreas) {
          if (!this.category.therapyAreas.hasOwnProperty(therapy_area_id)) continue;
          if (!this.category.prevalences[therapy_area_id]) continue;

          var percentage = {
            'name': this.category.therapyAreas[therapy_area_id],
            'value': this.category.prevalences[therapy_area_id] ? (parseFloat(this.category.prevalences[therapy_area_id]) / this.category.totalOccurence * 100).toFixed(2) : 0,
            'occurence': this.category.prevalences[therapy_area_id] ? this.category.prevalences[therapy_area_id] : 0,
            'therapy_area_id': therapy_area_id
          }
          this.category.initialChart.push(percentage)
        }
        // nouislider draw
        this.categoryConfig.range.max = this.category.initialChart.length - 1 || 1
        if (this.categoryNS) {
          this.categoryNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.category.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.categorySource = new LocalDataSource(this.category.initialChart)
        this.categorySource.load(this.category.initialChart)
        // datachart redraw
        this.categoryDrawChartStart = -1;
        this.categoryDrawChartStop = false;
        this.drawCategoryLiveChart();
        this.categoryTimer = setInterval(this.drawCategoryLiveChart.bind(this), 5000);
      });
  }

  fetchIndividualByCategoryData() {
    this.diseaseByCategoryFilter.therapy_area_id = this.therapyArea.id
    this.diseaseByCategory.liveChart = []
    this.diseaseByCategoryDrawChartStop = true;
    if (this.diseaseByCategoryTimer) clearInterval(this.diseaseByCategoryTimer);
    this.diseasePrevalenceService.diseaseByCategory(this.diseaseByCategoryFilter)
      .subscribe((res: any) => {
        this.diseaseByCategory = {
          initialChart: [],
          liveChart: [],
          diseases: res.individualDiseasesByCategory,
          prevalences: res.individualPrevalencesByCategory,
          totalOccurence: res.total || 1
        }
        for (var disease_id in this.diseaseByCategory.diseases) {
          if (!this.diseaseByCategory.diseases.hasOwnProperty(disease_id)) continue;
          if (!this.diseaseByCategory.prevalences[disease_id]) continue;
          var percentage = {
            'name': this.diseaseByCategory.diseases[disease_id],
            'value': this.diseaseByCategory.prevalences[disease_id] ? (parseFloat(this.diseaseByCategory.prevalences[disease_id]) / this.diseaseByCategory.totalOccurence * 100).toFixed(2) : 0,
            'occurence': this.diseaseByCategory.prevalences[disease_id] ? this.diseaseByCategory.prevalences[disease_id] : 0,
            'disease_id': disease_id
          }
          this.diseaseByCategory.initialChart.push(percentage)
        }
        // nouislider draw
        this.diseaseByCategoryConfig.range.max = this.diseaseByCategory.initialChart.length - 1 || 1
        if (this.diseaesByCategoryNS) {
          this.diseaesByCategoryNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.diseaseByCategory.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.diseaseByCategorySource = new LocalDataSource(this.diseaseByCategory.initialChart)
        this.diseaseByCategorySource.load(this.diseaseByCategory.initialChart)
        // datachart redraw
        this.diseaseByCategoryDrawChartStart = -1;
        this.diseaseByCategoryDrawChartStop = false;
        this.drawdiseaseByCategoryLiveChart();
        this.diseaseByCategoryTimer = setInterval(this.drawdiseaseByCategoryLiveChart.bind(this), 5000);
      });
  }

  drawIndividualLiveChart(force = false) {
    if (!force && this.individualDrawChartStop) return;
    if (!force) {
      this.individualDrawChartStart++;
    }
    if (this.individualDrawChartStart > this.individual.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.individualDrawChartStart = 0;
    }
    this.individual.liveChart = this.individual.initialChart.slice(this.individualDrawChartStart, this.individualDrawChartStart + this.barChartSettings.barChartDisplayCount);
  }

  drawCategoryLiveChart(force = false) {
    if (!force && this.categoryDrawChartStop) return;
    if (!force) {
      this.categoryDrawChartStart++;
    }
    if (this.categoryDrawChartStart > this.category.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.categoryDrawChartStart = 0;
    }
    this.category.liveChart = this.category.initialChart.slice(this.categoryDrawChartStart, this.categoryDrawChartStart + this.barChartSettings.barChartDisplayCount);
  }

  drawdiseaseByCategoryLiveChart(force = false) {
    if (!force && this.diseaseByCategoryDrawChartStop) return;
    if (!force) {
      this.diseaseByCategoryDrawChartStart++;
    }
    if (this.diseaseByCategoryDrawChartStart > this.diseaseByCategory.initialChart.length - this.pieChartSettings.pieChartDisplayCount) {
      this.diseaseByCategoryDrawChartStart = 0;
    }
    this.diseaseByCategory.liveChart = this.diseaseByCategory.initialChart.slice(this.diseaseByCategoryDrawChartStart, this.diseaseByCategoryDrawChartStart + this.pieChartSettings.pieChartDisplayCount);
  }
  onSelect(event) {
    //your code here
  }

  onSelectCategory(event) {
    this.therapyArea = {
      id: event.data.therapy_area_id,
      name: event.data.name
    }
    this.fetchIndividualByCategoryData()
  }
}
