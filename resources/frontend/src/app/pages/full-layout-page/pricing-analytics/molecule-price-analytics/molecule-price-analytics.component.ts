import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { MoleculePriceService } from '../../../../shared/_api/molecule-price.service';
import { Atc4Service } from '../../../../shared/_api/atc4.service';
import { Atc5Service } from '../../../../shared/_api/atc5.service';

import * as chartsData from '../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'app-molecule-price-analytics',
  templateUrl: './molecule-price-analytics.component.html',
  styleUrls: ['./molecule-price-analytics.component.scss']
})
export class MoleculePriceAnalyticsComponent implements OnInit {

  // global Settings  
  @ViewChild('avgPriceNS') avgPriceNS: NouisliderComponent
  @ViewChild('comparsionNS') comparsionNS: NouisliderComponent
  @ViewChild('acNS') acNS: NouisliderComponent

  isLoaded = false
  atc4s = []
  filter = {
    year: "",
    quarater: "",
    atc4_id: 1
  }

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // dataTable Settings
  dataTableSettings = settings.avgPriceSettings;
  dataTableSource: LocalDataSource;
  comparsionTableSettings = settings.comparsionSettings;
  comparsionTableSource: LocalDataSource;
  acTableSettings = settings.acSettings;
  acTableSource: LocalDataSource;

  // avgPrice Chart  
  avgPrice = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    avgs_wp: null,
    avgs_rp: null,
    avgs_hp: null,
    atc5s: null,
    initialChart: [],
    initialDataTable: [],
    liveChart: []
  }
  // comparsion Chart
  comparsion = {
    primary_atc_5: {
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
  // active constituent Chart
  ac = {
    atc5_name: "",
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    avgs_wp: null,
    avgs_rp: null,
    avgs_hp: null,
    atc5s: null,
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

  constructor(private moleculePriceService: MoleculePriceService, private atc4Service: Atc4Service, private atc5Service: Atc5Service) { }

  ngOnInit() {
    this.fetchGlobal();
  }

  getYears(startYear) {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(currentYear.toString());
      currentYear--
    }
    return years;
  }

  fetchGlobal() {
    let values$ = combineLatest(
      this.atc4Service.index(),
      (first) => {
        return { first };
      }
    );
    values$.subscribe((res: any) => {
      this.atc4s = res.first.atc4s
      this.fetchData();
      this.isLoaded = true;
    });
  }

  fetchData() {
    this.avgPrice.liveChart = []
    this.avgPrice.initialChart = []
    this.avgPrice.initialDataTable = []
    this.avgPrice.liveChartActivate = true;

    if (this.avgPrice.timer) clearInterval(this.avgPrice.timer);
    this.moleculePriceService.avgPrice(this.filter)
      .subscribe((res: any) => {
        this.avgPrice.atc5s = res.atc5s
        this.avgPrice.avgs_wp = res.avgs_wp
        this.avgPrice.avgs_rp = res.avgs_rp
        this.avgPrice.avgs_hp = res.avgs_hp

        for (var atc_id in this.avgPrice.avgs_wp) {
          if (!this.avgPrice.avgs_wp.hasOwnProperty(atc_id)) continue;

          var wp = {
            'name': 'Wholesale Price',
            'value': this.avgPrice.avgs_wp[atc_id] ? this.avgPrice.avgs_wp[atc_id] : 0,
            'atc5_id': atc_id,
            'atc5_name': this.avgPrice.atc5s[atc_id]
          }
          var rp = {
            'name': 'Retail Pharmacy Price',
            'value': this.avgPrice.avgs_rp[atc_id] ? this.avgPrice.avgs_rp[atc_id] : 0,
            'atc5_id': atc_id,
            'atc5_name': this.avgPrice.atc5s[atc_id]
          }
          var hp = {
            'name': 'Hospital Price',
            'value': this.avgPrice.avgs_hp[atc_id] ? this.avgPrice.avgs_hp[atc_id] : 0,
            'atc5_id': atc_id,
            'atc5_name': this.avgPrice.atc5s[atc_id]
          }
          var chart = {
            'name': this.avgPrice.atc5s[atc_id],
            'series': [wp, rp, hp]
          }
          this.avgPrice.initialDataTable.push({
            'name': this.avgPrice.atc5s[atc_id],
            'wp': this.avgPrice.avgs_wp[atc_id] ? this.avgPrice.avgs_wp[atc_id] : 0,
            'rp': this.avgPrice.avgs_rp[atc_id] ? this.avgPrice.avgs_rp[atc_id] : 0,
            'hp': this.avgPrice.avgs_hp[atc_id] ? this.avgPrice.avgs_hp[atc_id] : 0,
            'atc5_id': atc_id
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
          this.comparsion.primary_atc_5.name = ""
          this.comparsionTableSource = new LocalDataSource(this.comparsion.initialDataTable)
          this.comparsionTableSource.load(this.comparsion.initialDataTable)
          this.acFetch("", "");
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
    this.acFetch(event.data.atc5_id, event.data.name)
    this.setPrimaryAtc5(event.data.atc5_id, event.data.name)
  }

  selectChart(event) {
    this.acFetch(event.atc5_id, event.atc5_name)
    this.setPrimaryAtc5(event.atc5_id, event.atc5_name)
  }

  setPrimaryAtc5(atc5_id, atc5_name) {
    this.comparsion.primary_atc_5 = {
      id: atc5_id,
      name: atc5_name,
      wp: this.avgPrice.avgs_wp[atc5_id],
      rp: this.avgPrice.avgs_rp[atc5_id],
      hp: this.avgPrice.avgs_hp[atc5_id]
    }

    this.comparsion.liveChart = []
    this.comparsion.initialChart = []
    this.comparsion.initialDataTable = []
    this.comparsion.liveChartActivate = true;

    this.avgPrice.initialChart.forEach(chart => {
      if (chart.name === this.comparsion.primary_atc_5.name) return;
      let chartClone = JSON.parse(JSON.stringify(chart));
      chartClone.series[0].value = parseFloat((((chartClone.series[0].value - parseFloat(this.comparsion.primary_atc_5.wp)) / parseFloat(this.comparsion.primary_atc_5.wp)) * 100).toFixed(2))
      chartClone.series[1].value = parseFloat((((chartClone.series[1].value - parseFloat(this.comparsion.primary_atc_5.rp)) / parseFloat(this.comparsion.primary_atc_5.rp)) * 100).toFixed(2))
      chartClone.series[2].value = parseFloat((((chartClone.series[2].value - parseFloat(this.comparsion.primary_atc_5.hp)) / parseFloat(this.comparsion.primary_atc_5.hp)) * 100).toFixed(2))
      this.comparsion.initialChart.push(chartClone);
    })
    this.avgPrice.initialDataTable.forEach(chart => {
      if (chart.name === this.comparsion.primary_atc_5.name) return;
      let chartClone = JSON.parse(JSON.stringify(chart));
      chartClone.wp = (((chartClone.wp - parseFloat(this.comparsion.primary_atc_5.wp)) / parseFloat(this.comparsion.primary_atc_5.wp)) * 100).toFixed(2)
      chartClone.rp = (((chartClone.rp - parseFloat(this.comparsion.primary_atc_5.rp)) / parseFloat(this.comparsion.primary_atc_5.rp)) * 100).toFixed(2)
      chartClone.hp = (((chartClone.hp - parseFloat(this.comparsion.primary_atc_5.hp)) / parseFloat(this.comparsion.primary_atc_5.hp)) * 100).toFixed(2)
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

  acFetch(atc5_id, atc5_name) {
    this.ac.atc5_name = atc5_name
    this.ac.liveChart = []
    this.ac.initialChart = []
    this.ac.initialDataTable = []
    this.ac.liveChartActivate = true;

    if (this.ac.timer) clearInterval(this.ac.timer);
    this.moleculePriceService.avgPriceByAc({
      year: this.filter.year,
      quarater: this.filter.quarater,
      atc5_id: atc5_id
    })
      .subscribe((res: any) => {
        this.ac.avgs_wp = res.avgs_wp
        this.ac.avgs_rp = res.avgs_rp
        this.ac.avgs_hp = res.avgs_hp

        for (var ac_name in this.ac.avgs_wp) {
          if (!this.ac.avgs_wp.hasOwnProperty(ac_name)) continue;

          var wp = {
            'name': 'Wholesale Price',
            'value': this.ac.avgs_wp[ac_name] ? this.ac.avgs_wp[ac_name] : 0,
            'ac_name': ac_name
          }
          var rp = {
            'name': 'Retail Pharmacy Price',
            'value': this.ac.avgs_rp[ac_name] ? this.ac.avgs_rp[ac_name] : 0,
            'ac_name': ac_name
          }
          var hp = {
            'name': 'Hospital Price',
            'value': this.ac.avgs_hp[ac_name] ? this.ac.avgs_hp[ac_name] : 0,
            'ac_name': ac_name
          }
          var chart = {
            'name': ac_name,
            'series': [wp, rp, hp]
          }
          this.ac.initialDataTable.push({
            'name': ac_name,
            'wp': this.ac.avgs_wp[ac_name] ? this.ac.avgs_wp[ac_name] : 0,
            'rp': this.ac.avgs_rp[ac_name] ? this.ac.avgs_rp[ac_name] : 0,
            'hp': this.ac.avgs_hp[ac_name] ? this.ac.avgs_hp[ac_name] : 0
          })
          this.ac.initialChart.push(chart)
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
        this.acTableSource = new LocalDataSource(this.ac.initialDataTable)
        this.acTableSource.load(this.ac.initialDataTable)
        // datachart redraw
        this.ac.drawChartStartPos = -1;
        this.ac.liveChartActivate = false;
        this.acDrawLiveChart();
        this.ac.timer = setInterval(this.acDrawLiveChart.bind(this), 5000);
      });
  }

  acDrawLiveChart(force = false) {
    if (!force && this.ac.liveChartActivate) return;
    if (!force) {
      this.ac.drawChartStartPos++;
    }

    if (this.ac.drawChartStartPos > this.ac.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.ac.drawChartStartPos = 0;
    }
    this.ac.liveChart = this.ac.initialChart.slice(this.ac.drawChartStartPos, this.ac.drawChartStartPos + this.barChartSettings.barChartDisplayCount);
  }
}
