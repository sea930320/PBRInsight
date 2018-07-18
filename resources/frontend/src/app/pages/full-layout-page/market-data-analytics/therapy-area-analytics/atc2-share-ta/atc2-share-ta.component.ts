import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { TherapyAreaAnaService } from '../../../../../shared/_api/therapy-area-ana.service';
import { TherapyAreaAnaCommunicationService } from '../../../../../shared/_communication/therapy-area-ana.service';

import * as chartsData from '../../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'atc2-share-ta',
  templateUrl: './atc2-share-ta.component.html',
  styleUrls: ['./atc2-share-ta.component.scss']
})
export class Atc2ShareTaComponent implements OnInit {

  // global Settings
  @Input() drugForms: Array<any>;
  @Input() atc1s: Array<any>;

  @ViewChild('atc2NS') atc2NS: NouisliderComponent
  filter = {
    year: "",
    drug_form_id: "",
    atc1_id: ""
  }

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // dataTable Settings
  dataTableSettings = settings.atc2Settings;
  dataTableSource: LocalDataSource;

  // Disease By atc2 Chart  
  atc2 = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    valuations: null,
    totalValue: null,
    volumns: null,
    totalVolumn: null,
    atc2s: null,
    initialChart: [],
    initialDataTable: [],
    liveChart: []
  }

  // nouislider config
  atc2Config: any = {
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
    this.fetchData()
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

  fetchData() {
    this.atc2.liveChart = []
    this.atc2.initialChart = []
    this.atc2.initialDataTable = []
    this.atc2.liveChartActivate = true;

    if (this.atc2.timer) clearInterval(this.atc2.timer);
    this.therapyAreaAnaService.atc2Share(this.filter)
      .subscribe((res: any) => {
        this.atc2.atc2s = res.atc2s
        this.atc2.valuations = res.valuations
        this.atc2.volumns = res.volumns
        this.atc2.totalValue = res.totalValue || 1
        this.atc2.totalVolumn = res.totalVolumn || 1

        for (var atc2_id in this.atc2.atc2s) {
          if (!this.atc2.atc2s.hasOwnProperty(atc2_id)) continue;
          if (!this.atc2.valuations[atc2_id]) continue;
          var valuation = {
            'name': 'Value',
            'value': this.atc2.valuations[atc2_id] ? (parseFloat(this.atc2.valuations[atc2_id]) / this.atc2.totalValue * 100).toFixed(2) : 0,
            'naira': this.atc2.valuations[atc2_id] ? this.atc2.valuations[atc2_id] : 0,
            'atc2_id': atc2_id,
            'atc2_name': this.atc2.atc2s[atc2_id]
          }
          var volumn = {
            'name': 'Volumn',
            'value': this.atc2.volumns[atc2_id] ? (parseFloat(this.atc2.volumns[atc2_id]) / this.atc2.totalVolumn * 100).toFixed(2) : 0,
            'volumn': this.atc2.volumns[atc2_id] ? this.atc2.volumns[atc2_id] : 0,
            'atc2_id': atc2_id,
            'atc2_name': this.atc2.atc2s[atc2_id]
          }
          var chart = {
            'name': this.atc2.atc2s[atc2_id],
            'series': [valuation, volumn]
          }
          this.atc2.initialDataTable.push({
            'name': this.atc2.atc2s[atc2_id],
            'naira': this.atc2.valuations[atc2_id] ? this.atc2.valuations[atc2_id] : 0,
            'volumn': this.atc2.volumns[atc2_id] ? this.atc2.volumns[atc2_id] : 0,
            'atc2_id': atc2_id
          })
          this.atc2.initialChart.push(chart)
        }
        // nouislider draw
        this.atc2Config.range.max = this.atc2.initialChart.length - 1 || 1
        if (this.atc2NS) {
          this.atc2NS.slider.updateOptions({
            range: {
              min: 0,
              max: this.atc2.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.atc2.initialDataTable)
        this.dataTableSource.load(this.atc2.initialDataTable)
        // datachart redraw
        this.atc2.drawChartStartPos = -1;
        this.atc2.liveChartActivate = false;
        this.drawLiveChart();
        this.atc2.timer = setInterval(this.drawLiveChart.bind(this), 5000);
        // emit event
        if (this.atc2.initialChart.length === 0)
          this.changeFilter("", "")
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.atc2.liveChartActivate) return;
    if (!force) {
      this.atc2.drawChartStartPos++;
    }

    if (this.atc2.drawChartStartPos > this.atc2.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.atc2.drawChartStartPos = 0;
    }
    this.atc2.liveChart = this.atc2.initialChart.slice(this.atc2.drawChartStartPos, this.atc2.drawChartStartPos + this.barChartSettings.barChartDisplayCount);
  }

  selectChart(event) {
    this.changeFilter(event.atc2_id, event.atc2_name)
  }

  selectTable(event) {
    this.changeFilter(event.data.atc2_id, event.data.name)
  }

  changeFilter(atc2_id, atc2_name) {
    this.therapyAreaAnaCommunicationService.changeFilterEmit({
      year: this.filter.year,
      drug_form_id: this.filter.drug_form_id,
      atc2_id: atc2_id,
      atc2_name: atc2_name,
      to: 'atc4'
    })
  }
}
