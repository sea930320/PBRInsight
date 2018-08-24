import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { BrandMoleculeService } from '../../../../../shared/_api/brand-molecule.service';
import { TherapyAreaService } from '../../../../../shared/_api/therapy_area.service';

import * as chartsData from '../../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'ac-share',
  templateUrl: './ac-share.component.html',
  styleUrls: ['./ac-share.component.scss']
})
export class AcShareComponent implements OnInit {

  // global Settings
  @Input() clinicTypes: any[];
  @ViewChild('acNS') acNS: NouisliderComponent
  years = null
  therapyAreas = []
  diseases = []
  isLoaded = false
  filter = {
    therapy_area_id: "",
    disease_id: "",
    start_year: "",
    start_quarater: "",
    end_year: "",
    end_quarater: "",
    clinic_type_id: ""
  }
  totalTb = 1

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

  constructor(private therapyAreaService: TherapyAreaService, private brandMoleculeService: BrandMoleculeService) { }

  ngOnInit() {
    this.fetchGlobalValues()
  }

  fetchGlobalValues() {
    this.years = this.getYears(2016)
    this.therapyAreaService.index().subscribe((res: any) => {
      this.isLoaded = true
      this.therapyAreas = res.therapy_areas
      this.fetchData()
    });
  }

  getYears(startYear) {
    var currentYear = new Date().getFullYear() - 1, years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(currentYear--);
    }
    return years;
  }

  therapyAreaChange() {
    this.filter = {
      therapy_area_id: this.filter.therapy_area_id,
      disease_id: "",
      start_year: "",
      start_quarater: "",
      end_year: "",
      end_quarater: "",
      clinic_type_id: ""
    }
    this.therapyAreaService
      .show(this.filter.therapy_area_id)
      .subscribe((res: any) => {
        this.diseases = res.therapy_area.diseases
      });
    this.fetchData();
  }

  fetchData() {
    this.ac.liveChart = []
    this.ac.initialChart = []
    this.ac.liveChartActivate = true;

    if (this.ac.timer) clearInterval(this.ac.timer);
    // if (!this.filter.therapy_area_id && !this.filter.disease_id) return;

    this.brandMoleculeService.acShare(this.filter)
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
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.ac.liveChartActivate) return;
    if (!force) {
      this.ac.drawChartStartPos++;
    }
    if (this.ac.drawChartStartPos > this.ac.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.ac.drawChartStartPos = 0;
    }
    this.ac.liveChart = this.ac.initialChart.slice(this.ac.drawChartStartPos, this.ac.drawChartStartPos + this.barChartSettings.barChartDisplayCount);
  }

  changeFilter() {
    this.fetchData();
  }
}
