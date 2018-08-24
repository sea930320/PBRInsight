import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { ClinicTypeService } from '../../../../shared/_api/clinic_type.service';
import { TherapyAreaService } from '../../../../shared/_api/therapy_area.service';
import { TherapyAreaLevelService } from '../../../../shared/_api/therapy-area-level.service'

import * as chartsData from '../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'app-therapy-area-level',
  templateUrl: './therapy-area-level.component.html',
  styleUrls: ['./therapy-area-level.component.scss']
})
export class TherapyAreaLevelComponent implements OnInit {
  // global Settings
  @ViewChild('atcNS') atcNS: NouisliderComponent
  years = null
  clinicTypes = []
  therapyAreas = []
  diseases = []
  atcLevels = [2, 3, 4, 5]
  isLoaded = false
  filter = {
    atc_level: 2,
    therapy_area_id: "",
    disease_id: "",
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
  dataTableSettings = settings.atcSettings;
  dataTableSource: LocalDataSource;

  // Disease By Atc Chart  
  atc = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    shares: null,
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

  constructor(private clinicTypeService: ClinicTypeService, private therapyAreaService: TherapyAreaService, private therapyAreaLevelService: TherapyAreaLevelService) { }

  ngOnInit() {
    this.fetchGlobalValues()
  }

  fetchGlobalValues() {
    this.clinicTypes = []
    this.years = this.getYears(2016)
    let values$ = combineLatest(
      this.clinicTypeService.index(),
      this.therapyAreaService.index(),
      (first, second) => {
        return { first, second };
      }
    );
    values$.subscribe((res: any) => {
      this.isLoaded = true
      this.clinicTypes = res.first.clinic_types
      this.therapyAreas = res.second.therapy_areas
      this.fetchData();
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

  public beforeChange($event: NgbTabChangeEvent) {
    let id = $event.nextId.replace('ATC-', '');
    this.filter.atc_level = parseInt(id);
    this.fetchData();
  }

  therapyAreaChange() {
    this.filter = {
      atc_level: this.filter.atc_level,
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
    this.atc.liveChart = []
    this.atc.initialChart = []
    this.atc.liveChartActivate = true;

    if (this.atc.timer) clearInterval(this.atc.timer);
    // if (!this.filter.therapy_area_id && !this.filter.disease_id) return;
    let obsv = this.filter.disease_id ? this.therapyAreaLevelService.byDisease(this.filter) : this.therapyAreaLevelService.byTherapyArea(this.filter);
    obsv
      .subscribe((res: any) => {
        this.atc.atcs = res.atcs
        this.atc.shares = res.atcShares
        this.atc.totalOccurence = res.total || 1

        for (var atc_id in this.atc.atcs) {
          if (!this.atc.atcs.hasOwnProperty(atc_id)) continue;
          if (!this.atc.shares[atc_id]) continue;
          var percentage = {
            'name': this.atc.atcs[atc_id],
            'value': this.atc.shares[atc_id] ? (parseFloat(this.atc.shares[atc_id]) / this.atc.totalOccurence * 100).toFixed(2) : 0,
            'occurence': this.atc.shares[atc_id] ? this.atc.shares[atc_id] : 0,
            'brand_id': atc_id
          }
          this.atc.initialChart.push(percentage)
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.atc.initialChart)
        this.dataTableSource.load(this.atc.initialChart)
        // datachart redraw
        this.atc.drawChartStartPos = 0;
        this.atc.liveChartActivate = false;
        this.drawLiveChart();
        this.atc.timer = setInterval(this.drawLiveChart.bind(this), 2000);
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
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.atc.liveChartActivate) return;
    if (!force) {
      this.atc.drawChartStartPos++;
    }

    if (this.atc.drawChartStartPos > this.atc.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.atc.drawChartStartPos = 0;
    }
    this.atc.liveChart = this.atc.initialChart.slice(this.atc.drawChartStartPos, this.atc.drawChartStartPos + this.barChartSettings.barChartDisplayCount);
  }
}
