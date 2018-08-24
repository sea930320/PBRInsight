import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { TherapyAreaAnaService } from '../../../../../shared/_api/therapy-area-ana.service';
import { TherapyAreaAnaCommunicationService } from '../../../../../shared/_communication/therapy-area-ana.service';

import * as chartsData from '../../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'atc4-share-ta',
  templateUrl: './atc4-share-ta.component.html',
  styleUrls: ['./atc4-share-ta.component.scss']
})
export class Atc4ShareTaComponent implements OnInit {

  // global Settings
  @Input() drugForms: Array<any>;

  @ViewChild('atc4NS') atc4NS: NouisliderComponent
  filter = {
    year: "",
    drug_form_id: "",
    atc2_id: "",
    atc2_name: ""
  }

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // dataTable Settings
  dataTableSettings = settings.atc4Settings;
  dataTableSource: LocalDataSource;

  // Disease By atc4 Chart  
  atc4 = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    valuations: null,
    totalValue: null,
    volumns: null,
    totalVolumn: null,
    atc4s: null,
    initialChart: [],
    initialDataTable: [],
    liveChart: []
  }

  // nouislider config
  atc4Config: any = {
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
      if (filter.to === 'atc4') {
        this.filter = filter
        this.fetchData()
      }
    });
  }

  fetchData() {
    this.atc4.liveChart = []
    this.atc4.initialChart = []
    this.atc4.initialDataTable = []
    this.atc4.liveChartActivate = true;

    if (this.atc4.timer) clearInterval(this.atc4.timer);
    this.therapyAreaAnaService.atc4Share(this.filter)
      .subscribe((res: any) => {
        this.atc4.atc4s = res.atc4s
        this.atc4.valuations = res.valuations
        this.atc4.volumns = res.volumns
        this.atc4.totalValue = res.totalValue || 1
        this.atc4.totalVolumn = res.totalVolumn || 1

        for (var atc4_id in this.atc4.atc4s) {
          if (!this.atc4.atc4s.hasOwnProperty(atc4_id)) continue;
          if (!this.atc4.valuations[atc4_id]) continue;
          var valuation = {
            'name': 'Value',
            'value': this.atc4.valuations[atc4_id] ? (parseFloat(this.atc4.valuations[atc4_id]) / this.atc4.totalValue * 100).toFixed(2) : 0,
            'naira': this.atc4.valuations[atc4_id] ? this.atc4.valuations[atc4_id] : 0,
            'atc4_id': atc4_id,
            'atc4_name': this.atc4.atc4s[atc4_id]
          }
          var volumn = {
            'name': 'Volume',
            'value': this.atc4.volumns[atc4_id] ? (parseFloat(this.atc4.volumns[atc4_id]) / this.atc4.totalVolumn * 100).toFixed(2) : 0,
            'volumn': this.atc4.volumns[atc4_id] ? this.atc4.volumns[atc4_id] : 0,
            'atc4_id': atc4_id
          }
          var chart = {
            'name': this.atc4.atc4s[atc4_id],
            'series': [valuation, volumn]
          }
          this.atc4.initialDataTable.push({
            'name': this.atc4.atc4s[atc4_id],
            'naira': this.atc4.valuations[atc4_id] ? this.atc4.valuations[atc4_id] : 0,
            'volumn': this.atc4.volumns[atc4_id] ? this.atc4.volumns[atc4_id] : 0,
            'atc4_id': atc4_id
          })
          this.atc4.initialChart.push(chart)
        }
        // nouislider draw
        this.atc4Config.range.max = this.atc4.initialChart.length - 1 || 1
        if (this.atc4NS) {
          this.atc4NS.slider.updateOptions({
            range: {
              min: 0,
              max: this.atc4.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.atc4.initialDataTable)
        this.dataTableSource.load(this.atc4.initialDataTable)
        // datachart redraw
        this.atc4.drawChartStartPos = -1;
        this.atc4.liveChartActivate = false;
        this.drawLiveChart();
        this.atc4.timer = setInterval(this.drawLiveChart.bind(this), 5000);
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.atc4.liveChartActivate) return;
    if (!force) {
      this.atc4.drawChartStartPos++;
    }

    if (this.atc4.drawChartStartPos > this.atc4.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.atc4.drawChartStartPos = 0;
    }
    this.atc4.liveChart = this.atc4.initialChart.slice(this.atc4.drawChartStartPos, this.atc4.drawChartStartPos + this.barChartSettings.barChartDisplayCount);
  }

  selectChart(event) {
    this.changeFilter(event.atc4_id, event.act4_name)
  }

  selectTable(event) {
    this.changeFilter(event.data.atc4_id, event.data.name)
  }

  changeFilter(atc4_id, atc4_name) {
    this.therapyAreaAnaCommunicationService.changeFilterEmit({
      year: this.filter.year,
      drug_form_id: this.filter.drug_form_id,
      atc4_id: atc4_id,
      atc4_name: atc4_name,
      to: 'atc5'
    })
  }
}
