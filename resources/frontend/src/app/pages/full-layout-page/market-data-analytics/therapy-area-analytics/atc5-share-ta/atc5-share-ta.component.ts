import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { TherapyAreaAnaService } from '../../../../../shared/_api/therapy-area-ana.service';
import { TherapyAreaAnaCommunicationService } from '../../../../../shared/_communication/therapy-area-ana.service';

import * as chartsData from '../../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'atc5-share-ta',
  templateUrl: './atc5-share-ta.component.html',
  styleUrls: ['./atc5-share-ta.component.scss']
})
export class Atc5ShareTaComponent implements OnInit {

  // global Settings
  @Input() drugForms: Array<any>;

  @ViewChild('atc5NS') atc5NS: NouisliderComponent
  filter = {
    year: "",
    drug_form_id: "",
    atc4_id: "",
    atc4_name: ""
  }

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // dataTable Settings
  dataTableSettings = settings.atc5Settings;
  dataTableSource: LocalDataSource;

  // Disease By atc5 Chart  
  atc5 = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    valuations: null,
    totalValue: null,
    volumns: null,
    totalVolumn: null,
    atc5s: null,
    initialChart: [],
    initialDataTable: [],
    liveChart: []
  }

  // nouislider config
  atc5Config: any = {
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

  constructor(private therapyAreaAnaService: TherapyAreaAnaService, private therapyAreaAnaCommunicationService: TherapyAreaAnaCommunicationService) { }

  ngOnInit() {
    this.therapyAreaAnaCommunicationService.changeFilter.subscribe(filter => {
      if (filter.to === 'atc5') {
        this.filter = filter
        this.fetchData()
      }
    });
  }

  fetchData() {
    this.atc5.liveChart = []
    this.atc5.initialChart = []
    this.atc5.initialDataTable = []
    this.atc5.liveChartActivate = true;

    if (this.atc5.timer) clearInterval(this.atc5.timer);
    this.therapyAreaAnaService.atc5Share(this.filter)
      .subscribe((res: any) => {
        this.atc5.atc5s = res.atc5s
        this.atc5.valuations = res.valuations
        this.atc5.volumns = res.volumns
        this.atc5.totalValue = res.totalValue || 1
        this.atc5.totalVolumn = res.totalVolumn || 1

        for (var atc5_id in this.atc5.atc5s) {
          if (!this.atc5.atc5s.hasOwnProperty(atc5_id)) continue;
          if (!this.atc5.valuations[atc5_id]) continue;
          var valuation = {
            'name': 'Value',
            'value': this.atc5.valuations[atc5_id] ? (parseFloat(this.atc5.valuations[atc5_id]) / this.atc5.totalValue * 100).toFixed(2) : 0,
            'naira': this.atc5.valuations[atc5_id] ? this.atc5.valuations[atc5_id] : 0,
            'atc5_id': atc5_id,
            'atc5_name': this.atc5.atc5s[atc5_id]
          }
          var volumn = {
            'name': 'Volumn',
            'value': this.atc5.volumns[atc5_id] ? (parseFloat(this.atc5.volumns[atc5_id]) / this.atc5.totalVolumn * 100).toFixed(2) : 0,
            'volumn': this.atc5.volumns[atc5_id] ? this.atc5.volumns[atc5_id] : 0,
            'atc5_id': atc5_id
          }
          var chart = {
            'name': this.atc5.atc5s[atc5_id],
            'series': [valuation, volumn]
          }
          this.atc5.initialDataTable.push({
            'name': this.atc5.atc5s[atc5_id],
            'naira': this.atc5.valuations[atc5_id] ? this.atc5.valuations[atc5_id] : 0,
            'volumn': this.atc5.volumns[atc5_id] ? this.atc5.volumns[atc5_id] : 0,
            'atc5_id': atc5_id
          })
          this.atc5.initialChart.push(chart)
        }
        // nouislider draw
        this.atc5Config.range.max = this.atc5.initialChart.length - 1 || 1
        if (this.atc5NS) {
          this.atc5NS.slider.updateOptions({
            range: {
              min: 0,
              max: this.atc5.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.atc5.initialDataTable)
        this.dataTableSource.load(this.atc5.initialDataTable)
        // datachart redraw
        this.atc5.drawChartStartPos = -1;
        this.atc5.liveChartActivate = false;
        this.drawLiveChart();
        this.atc5.timer = setInterval(this.drawLiveChart.bind(this), 5000);
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.atc5.liveChartActivate) return;
    if (!force) {
      this.atc5.drawChartStartPos++;
    }

    if (this.atc5.drawChartStartPos > this.atc5.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.atc5.drawChartStartPos = 0;
    }
    this.atc5.liveChart = this.atc5.initialChart.slice(this.atc5.drawChartStartPos, this.atc5.drawChartStartPos + this.barChartSettings.barChartDisplayCount);
  }
}
