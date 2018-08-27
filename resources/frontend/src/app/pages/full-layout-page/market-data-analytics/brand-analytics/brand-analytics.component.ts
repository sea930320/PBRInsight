import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { DrugFormService } from '../../../../shared/_api/drug-form.service';
import { BrandAnaService } from '../../../../shared/_api/brand-ana.service';
import { Atc1Service } from '../../../../shared/_api/atc1.service';
import { Atc4Service } from '../../../../shared/_api/atc4.service';
import { Atc5Service } from '../../../../shared/_api/atc5.service';

import * as chartsData from '../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'app-brand-analytics',
  templateUrl: './brand-analytics.component.html',
  styleUrls: ['./brand-analytics.component.scss']
})
export class BrandAnalyticsComponent implements OnInit {

  // global Settings  
  @ViewChild('brandNS') brandNS: NouisliderComponent
  drugForms = []
  isLoaded = false
  atcLevels = [1, 4, 5]
  curAtcId = 1
  curAtcs = []
  atc1s = []
  atc4s = []
  atc5s = []
  filter = {
    year: "",
    drug_form_id: "",
    atc1_id: 1,
    atc4_id: null,
    atc5_id: null
  }

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // dataTable Settings
  dataTableSettings = settings.brandSettings;
  dataTableSource: LocalDataSource;

  // Disease By brand Chart  
  brand = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    valuations: null,
    totalValue: null,
    volumns: null,
    totalVolumn: null,
    brands: null,
    initialChart: [],
    initialDataTable: [],
    liveChart: []
  }
  // nouislider config
  brandConfig: any = {
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


  constructor(private drugFormService: DrugFormService, private brandAnaService: BrandAnaService, private atc1Service: Atc1Service, private atc4Service: Atc4Service, private atc5Service: Atc5Service) { }

  ngOnInit() {
    this.fetchGlobal();
  }

  getYears(startYear) {
    var currentYear = new Date().getFullYear() - 1, years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(currentYear.toString());
      currentYear--
    }
    return years;
  }

  public beforeChange($event: NgbTabChangeEvent) {
    let id = $event.nextId.replace('ATC-', '');
    this.curAtcId = parseInt(id)
    this.filter.atc1_id = null
    this.filter.atc4_id = null
    this.filter.atc5_id = null
    switch (this.curAtcId) {
      case 1:
        this.curAtcs = this.atc1s
        this.filter.atc1_id = 1
        break;
      case 4:
        this.curAtcs = this.atc4s
        this.filter.atc4_id = 1
        break;
      case 5:
        this.curAtcs = this.atc5s
        this.filter.atc5_id = 1
        break;
    }
    this.curAtcs = [...this.curAtcs]
    this.fetchData();
  }

  fetchGlobal() {
    let values$ = combineLatest(
      this.drugFormService.index(),
      this.atc1Service.index(),
      this.atc4Service.index(),
      this.atc5Service.index(),
      (first, second, third, fourth) => {
        return { first, second, third, fourth };
      }
    );
    values$.subscribe((res: any) => {
      this.drugForms = res.first.drug_forms
      this.atc1s = res.second.atc1s
      this.atc4s = res.third.atc4s
      this.atc5s = res.fourth.atc5s
      this.curAtcs = this.atc1s
      this.curAtcs = [...this.curAtcs]
      this.isLoaded = true;
      this.fetchData();
    });
  }

  fetchData() {
    this.brand.liveChart = []
    this.brand.initialChart = []
    this.brand.initialDataTable = []
    this.brand.liveChartActivate = true;

    if (this.brand.timer) clearInterval(this.brand.timer);
    this.brandAnaService.brandShare(this.filter)
      .subscribe((res: any) => {
        this.brand.brands = res.brands
        this.brand.valuations = res.valuations
        this.brand.volumns = res.volumns
        this.brand.totalValue = res.totalValue || 1
        this.brand.totalVolumn = res.totalVolumn || 1

        for (var brand_id in this.brand.brands) {
          if (!this.brand.brands.hasOwnProperty(brand_id)) continue;
          if (!this.brand.valuations[brand_id]) continue;
          var valuation = {
            'name': 'Value',
            'value': this.brand.valuations[brand_id] ? (parseFloat(this.brand.valuations[brand_id]) / this.brand.totalValue * 100).toFixed(2) : 0,
            'naira': this.brand.valuations[brand_id] ? this.brand.valuations[brand_id] : 0,
            'brand_id': brand_id,
            'brand_name': this.brand.brands[brand_id]
          }
          var volumn = {
            'name': 'Volume',
            'value': this.brand.volumns[brand_id] ? (parseFloat(this.brand.volumns[brand_id]) / this.brand.totalVolumn * 100).toFixed(2) : 0,
            'volumn': this.brand.volumns[brand_id] ? this.brand.volumns[brand_id] : 0,
            'brand_id': brand_id,
            'brand_name': this.brand.brands[brand_id]
          }
          var chart = {
            'name': this.brand.brands[brand_id],
            'series': [valuation, volumn]
          }
          this.brand.initialDataTable.push({
            'name': this.brand.brands[brand_id],
            'naira': this.brand.valuations[brand_id] ? this.brand.valuations[brand_id] : 0,
            'volumn': this.brand.volumns[brand_id] ? this.brand.volumns[brand_id] : 0,
            'brand_id': brand_id
          })
          this.brand.initialChart.push(chart)
        }
        // nouislider draw
        this.brandConfig.range.max = this.brand.initialChart.length - 1 || 1
        if (this.brandNS) {
          this.brandNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.brand.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.brand.initialDataTable)
        this.dataTableSource.load(this.brand.initialDataTable)
        // datachart redraw
        this.brand.drawChartStartPos = -1;
        this.brand.liveChartActivate = false;
        this.drawLiveChart();
        this.brand.timer = setInterval(this.drawLiveChart.bind(this), 5000);
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.brand.liveChartActivate) return;
    if (!force) {
      this.brand.drawChartStartPos++;
    }

    if (this.brand.drawChartStartPos > this.brand.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.brand.drawChartStartPos = 0;
    }
    this.brand.liveChart = this.brand.initialChart.slice(this.brand.drawChartStartPos, this.brand.drawChartStartPos + this.barChartSettings.barChartDisplayCount);
  }
}
