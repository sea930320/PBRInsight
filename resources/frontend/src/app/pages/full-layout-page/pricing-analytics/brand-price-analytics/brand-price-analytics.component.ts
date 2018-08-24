import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { BrandPriceService } from '../../../../shared/_api/brand-price.service';
import { Atc4Service } from '../../../../shared/_api/atc4.service';
import { Atc5Service } from '../../../../shared/_api/atc5.service';

import * as chartsData from '../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'


@Component({
  selector: 'app-brand-price-analytics',
  templateUrl: './brand-price-analytics.component.html',
  styleUrls: ['./brand-price-analytics.component.scss']
})
export class BrandPriceAnalyticsComponent implements OnInit {

  // global Settings  
  @ViewChild('avgPriceNS') avgPriceNS: NouisliderComponent
  @ViewChild('comparsionNS') comparsionNS: NouisliderComponent

  isLoaded = false
  filter = {
    year: "",
    quarater: ""
  }

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // dataTable Settings
  dataTableSettings = settings.avgPriceSettings;
  dataTableSource: LocalDataSource;
  comparsionTableSettings = settings.comparsionSettings;
  comparsionTableSource: LocalDataSource;

  // avgPrice Chart  
  avgPrice = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    avgs_wp: null,
    avgs_rp: null,
    avgs_hp: null,
    brands: null,
    initialChart: [],
    initialDataTable: [],
    liveChart: []
  }
  // comparsion Chart
  comparsion = {
    primary_brand: {
      id: "",
      name: "",
      wp: "",
      rp: "",
      hp: ""
    },
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    initialChart: [],
    initialDataTable: [],
    liveChart: []
  }
  // nouislider config
  avgPriceConfig: any = {
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
  comparsionConfig: any = {
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

  constructor(private brandPriceService: BrandPriceService, private atc4Service: Atc4Service, private atc5Service: Atc5Service) { }

  ngOnInit() {
    this.fetchData();
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

  fetchData() {
    this.avgPrice.liveChart = []
    this.avgPrice.initialChart = []
    this.avgPrice.initialDataTable = []
    this.avgPrice.liveChartActivate = true;

    if (this.avgPrice.timer) clearInterval(this.avgPrice.timer);
    this.brandPriceService.avgPrice(this.filter)
      .subscribe((res: any) => {
        this.avgPrice.brands = res.brands
        this.avgPrice.avgs_wp = res.avgs_wp
        this.avgPrice.avgs_rp = res.avgs_rp
        this.avgPrice.avgs_hp = res.avgs_hp

        for (var brand_id in this.avgPrice.avgs_wp) {
          if (!this.avgPrice.avgs_wp.hasOwnProperty(brand_id)) continue;

          var wp = {
            'name': 'Wholesale Price',
            'value': this.avgPrice.avgs_wp[brand_id] ? this.avgPrice.avgs_wp[brand_id] : 0,
            'brand_id': brand_id,
            'brand_name': this.avgPrice.brands[brand_id]
          }
          var rp = {
            'name': 'Retail Pharmacy Price',
            'value': this.avgPrice.avgs_rp[brand_id] ? this.avgPrice.avgs_rp[brand_id] : 0,
            'brand_id': brand_id,
            'brand_name': this.avgPrice.brands[brand_id]
          }
          var hp = {
            'name': 'Hospital Price',
            'value': this.avgPrice.avgs_hp[brand_id] ? this.avgPrice.avgs_hp[brand_id] : 0,
            'brand_id': brand_id,
            'brand_name': this.avgPrice.brands[brand_id]
          }
          var chart = {
            'name': this.avgPrice.brands[brand_id],
            'series': [wp, rp, hp]
          }
          this.avgPrice.initialDataTable.push({
            'name': this.avgPrice.brands[brand_id],
            'wp': this.avgPrice.avgs_wp[brand_id] ? this.avgPrice.avgs_wp[brand_id] : 0,
            'rp': this.avgPrice.avgs_rp[brand_id] ? this.avgPrice.avgs_rp[brand_id] : 0,
            'hp': this.avgPrice.avgs_hp[brand_id] ? this.avgPrice.avgs_hp[brand_id] : 0,
            'brand_id': brand_id
          })
          this.avgPrice.initialChart.push(chart)
        }
        // nouislider draw
        this.avgPriceConfig.range.max = this.avgPrice.initialChart.length - 1 || 1
        if (this.avgPriceNS) {
          this.avgPriceNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.avgPrice.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.avgPrice.initialDataTable)
        this.dataTableSource.load(this.avgPrice.initialDataTable)
        // datachart redraw
        this.avgPrice.drawChartStartPos = -1;
        this.avgPrice.liveChartActivate = false;
        this.drawLiveChart();
        this.avgPrice.timer = setInterval(this.drawLiveChart.bind(this), 5000);
        // comparsion chart clear
        if (this.avgPrice.initialChart.length === 0) {
          this.comparsion.liveChart = []
          this.comparsion.initialChart = []
          this.comparsion.initialDataTable = []
          this.comparsion.primary_brand.name = ""
          this.comparsionTableSource = new LocalDataSource(this.comparsion.initialDataTable)
          this.comparsionTableSource.load(this.comparsion.initialDataTable)
        }
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.avgPrice.liveChartActivate) return;
    if (!force) {
      this.avgPrice.drawChartStartPos++;
    }

    if (this.avgPrice.drawChartStartPos > this.avgPrice.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.avgPrice.drawChartStartPos = 0;
    }
    this.avgPrice.liveChart = this.avgPrice.initialChart.slice(this.avgPrice.drawChartStartPos, this.avgPrice.drawChartStartPos + this.barChartSettings.barChartDisplayCount);
  }

  selectTable(event) {
    this.setPrimaryBrand(event.data.brand_id, event.data.name)
  }

  selectChart(event) {
    this.setPrimaryBrand(event.brand_id, event.brand_name)
  }

  setPrimaryBrand(brand_id, brand_name) {
    this.comparsion.primary_brand = {
      id: brand_id,
      name: brand_name,
      wp: this.avgPrice.avgs_wp[brand_id],
      rp: this.avgPrice.avgs_rp[brand_id],
      hp: this.avgPrice.avgs_hp[brand_id]
    }

    this.comparsion.liveChart = []
    this.comparsion.initialChart = []
    this.comparsion.initialDataTable = []
    this.comparsion.liveChartActivate = true;

    this.avgPrice.initialChart.forEach(chart => {
      if (chart.name === this.comparsion.primary_brand.name) return;
      let chartClone = JSON.parse(JSON.stringify(chart));
      chartClone.series[0].value = parseFloat((((chartClone.series[0].value - parseFloat(this.comparsion.primary_brand.wp)) / parseFloat(this.comparsion.primary_brand.wp)) * 100).toFixed(2))
      chartClone.series[1].value = parseFloat((((chartClone.series[1].value - parseFloat(this.comparsion.primary_brand.rp)) / parseFloat(this.comparsion.primary_brand.rp)) * 100).toFixed(2))
      chartClone.series[2].value = parseFloat((((chartClone.series[2].value - parseFloat(this.comparsion.primary_brand.hp)) / parseFloat(this.comparsion.primary_brand.hp)) * 100).toFixed(2))
      this.comparsion.initialChart.push(chartClone);
    })
    this.avgPrice.initialDataTable.forEach(chart => {
      if (chart.name === this.comparsion.primary_brand.name) return;
      let chartClone = JSON.parse(JSON.stringify(chart));
      chartClone.wp = (((chartClone.wp - parseFloat(this.comparsion.primary_brand.wp)) / parseFloat(this.comparsion.primary_brand.wp)) * 100).toFixed(2)
      chartClone.rp = (((chartClone.rp - parseFloat(this.comparsion.primary_brand.rp)) / parseFloat(this.comparsion.primary_brand.rp)) * 100).toFixed(2)
      chartClone.hp = (((chartClone.hp - parseFloat(this.comparsion.primary_brand.hp)) / parseFloat(this.comparsion.primary_brand.hp)) * 100).toFixed(2)
      this.comparsion.initialDataTable.push(chartClone);
    })
    // nouislider draw
    this.comparsionConfig.range.max = this.comparsion.initialChart.length - 1 || 1
    if (this.comparsionNS) {
      this.comparsionNS.slider.updateOptions({
        range: {
          min: 0,
          max: this.comparsion.initialChart.length - 1 || 1
        }
      });
    }
    // datatable redraw
    this.comparsionTableSource = new LocalDataSource(this.comparsion.initialDataTable)
    this.comparsionTableSource.load(this.comparsion.initialDataTable)
    // datachart redraw
    this.comparsion.drawChartStartPos = -1;
    this.comparsion.liveChartActivate = false;
    this.comparsionDrawLiveChart();
    this.comparsion.timer = setInterval(this.comparsionDrawLiveChart.bind(this), 5000);
  }

  comparsionDrawLiveChart(force = false) {
    if (!force && this.comparsion.liveChartActivate) return;
    if (!force) {
      this.comparsion.drawChartStartPos++;
    }

    if (this.comparsion.drawChartStartPos > this.comparsion.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.comparsion.drawChartStartPos = 0;
    }
    this.comparsion.liveChart = this.comparsion.initialChart.slice(this.comparsion.drawChartStartPos, this.comparsion.drawChartStartPos + this.barChartSettings.barChartDisplayCount);
  }
}
