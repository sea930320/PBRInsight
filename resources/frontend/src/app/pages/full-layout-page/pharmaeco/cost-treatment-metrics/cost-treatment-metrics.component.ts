import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { CostTreatmentService } from '../../../../shared/_api/cost-treatment.service';
import { CoMorbiditiesService } from '../../../../shared/_api/co_morbidities.service';
import { TherapyAreaService } from '../../../../shared/_api/therapy_area.service';

import * as chartsData from '../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'
import { formatLabel } from '../../../../shared/_helpers/common';

@Component({
  selector: 'app-cost-treatment-metrics',
  templateUrl: './cost-treatment-metrics.component.html',
  styleUrls: ['./cost-treatment-metrics.component.scss']
})
export class CostTreatmentMetricsComponent implements OnInit {

  // global Settings
  @ViewChild('costTreatmentNS') costTreatmentNS: NouisliderComponent

  therapyAreas = []
  initialData = {
    costTreatments: null
  }
  filter = {
    therapy_area_id: 1,
  }

  //Diagnosis Set
  diagonsisSets = null

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;
  // Pie Charts
  pieChartSettings = chartsData.pieChartSettings;
  pieChartView: any[] = chartsData.pieChartView;

  // cost Treatment Chart
  costTreatment = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    costTreatments: [],
    by_disease_id: null,
    initialChart: [],
    liveChart: []
  }
  // Co-Morbidities Chart
  coMorbidities = {
    data: null,
    totalOccurence: null,
    liveChart: []
  }

  // dataTable Settings  
  dataTableSettings = settings.costTreatmentSettings;
  dataTableSource: LocalDataSource;

  // nouislider config
  costTreatmentConfig: any = {
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
  constructor(private therapyAreaService: TherapyAreaService, private costTreatmentService: CostTreatmentService, private coMorbiditiesService: CoMorbiditiesService) { }

  ngOnInit() {
    this.fetchTherapyArea()
    this.fetchData();
  }

  getYears(startYear) {
    var currentYear = new Date().getFullYear() - 1, years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(currentYear--);
    }
    return years;
  }

  fetchTherapyArea() {
    this.therapyAreaService.index()
      .subscribe((res: any) => {
        this.therapyAreas = res.therapy_areas
        this.fetchCormobiditiesData()
      });
  }

  fetchData() {
    this.costTreatment.liveChart = []
    this.costTreatment.initialChart = []
    this.costTreatment.liveChartActivate = true;

    if (this.costTreatment.timer) clearInterval(this.costTreatment.timer);
    this.costTreatmentService.index()
      .subscribe((res: any) => {
        this.costTreatment.costTreatments = res.cost_treatments
        this.costTreatment.by_disease_id = res.by_disease_id
        this.costTreatment.costTreatments.forEach(costTreatment => {
          if (!costTreatment.cost_treatment) return;
          var chart = {
            'name': costTreatment.disease.name,
            'value': costTreatment.cost_treatment
          }
          this.costTreatment.initialChart.push(chart)
        })
        // nouislider draw
        this.costTreatmentConfig.range.max = this.costTreatment.initialChart.length - 1 || 1
        if (this.costTreatmentNS) {
          this.costTreatmentNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.costTreatment.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.costTreatment.initialChart)
        this.dataTableSource.load(this.costTreatment.initialChart)
        // datachart redraw
        this.costTreatment.drawChartStartPos = -1;
        this.costTreatment.liveChartActivate = false;
        this.drawLiveChart();
        this.costTreatment.timer = setInterval(this.drawLiveChart.bind(this), 5000);
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.costTreatment.liveChartActivate) return;
    if (!force) {
      this.costTreatment.drawChartStartPos++;
    }

    if (this.costTreatment.drawChartStartPos > this.costTreatment.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.costTreatment.drawChartStartPos = 0;
    }
    this.costTreatment.liveChart = this.costTreatment.initialChart.slice(this.costTreatment.drawChartStartPos, this.costTreatment.drawChartStartPos + this.barChartSettings.barChartDisplayCount);
  }

  fetchCormobiditiesData() {
    this.coMorbidities.liveChart = []
    this.diagonsisSets = null
    this.coMorbiditiesService.index(this.filter)
      .subscribe((res: any) => {
        this.coMorbidities.data = res.coMorbidities
        this.coMorbidities.totalOccurence = res.total || 1
        for (var coIndex in this.coMorbidities.data) {
          if (!this.coMorbidities.data.hasOwnProperty(coIndex)) continue;
          var percentage = {
            'name': coIndex + ' co-morbidities',
            'value': this.coMorbidities.data[coIndex].count,
            'coIndex': coIndex
          }
          this.coMorbidities.liveChart.push(percentage)
        }
      })
  }

  selectLegend(event) {
    let id = event.name.replace(' co-morbidities', '');
    this.diagonsisSets = this.coMorbidities.data[id]
  }

  pieTooltipText({ data }) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
  }

  calcPercentage(value) {
    return parseFloat(value).toFixed(2)
  }

  calcTreatment(bundlePair) {
    let totalCost = 0;
    bundlePair.bundle.forEach(bundle => {
      let disease_id = bundle.disease.id
      totalCost += (this.costTreatment.by_disease_id[disease_id] ? this.costTreatment.by_disease_id[disease_id] : 0);
    })
    return `${Number(totalCost).toLocaleString('en-GB')}`;
  }
}
