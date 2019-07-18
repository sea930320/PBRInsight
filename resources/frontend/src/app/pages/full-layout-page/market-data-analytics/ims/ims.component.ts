import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { DrugFormService } from '../../../../shared/_api/drug-form.service';
import { MoleculeAnaService } from '../../../../shared/_api/molecule-ana.service';
import { Atc1Service } from '../../../../shared/_api/atc1.service';
import { Atc4Service } from '../../../../shared/_api/atc4.service';
import { Atc5Service } from '../../../../shared/_api/atc5.service';

import * as chartsData from '../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'app-ims',
  templateUrl: './ims.component.html',
  styleUrls: ['./ims.component.scss']
})
export class ImsComponent implements OnInit {

  // global Settings  
  @ViewChild('moleculeNS') moleculeNS: NouisliderComponent
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
  dataTableSettings = settings.moleculeSettings;
  dataTableSource: LocalDataSource;

  // Disease By molecule Chart  
  molecule = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    imses: null,
    totalIms: null,
    molecules: null,
    initialChart: [],
    initialDataTable: [],
    liveChart: []
  }
  // nouislider config
  moleculeConfig: any = {
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


  constructor(private drugFormService: DrugFormService, private moleculeAnaService: MoleculeAnaService, private atc1Service: Atc1Service, private atc4Service: Atc4Service, private atc5Service: Atc5Service) { }

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
    this.molecule.liveChart = []
    this.molecule.initialChart = []
    this.molecule.initialDataTable = []
    this.molecule.liveChartActivate = true;

    if (this.molecule.timer) clearInterval(this.molecule.timer);
    this.moleculeAnaService.moleculeShare(this.filter)
      .subscribe((res: any) => {
        this.molecule.molecules = res.generic_names
        this.molecule.imses = res.imses
        this.molecule.totalIms = res.totalIms || 1

        for (var molecule_id in this.molecule.molecules) {
          if (!this.molecule.molecules.hasOwnProperty(molecule_id)) continue;

          var ims = {
            'name': 'IMS Equivalent Valuation',
            'value': this.molecule.imses[molecule_id] ? (parseFloat(this.molecule.imses[molecule_id]) / this.molecule.totalIms * 100).toFixed(2) : 0,
            'ims': this.molecule.imses[molecule_id] ? this.molecule.imses[molecule_id] : 0,
            'molecule_id': molecule_id,
            'molecule_name': this.molecule.molecules[molecule_id]
          }
          if (ims['ims'] == 0) continue
          var chart = {
            'name': this.molecule.molecules[molecule_id],
            'series': [ims]
          }
          this.molecule.initialDataTable.push({
            'name': this.molecule.molecules[molecule_id],
            'ims': this.molecule.imses[molecule_id] ? this.molecule.imses[molecule_id] : 0,
            'molecule_id': molecule_id
          })
          this.molecule.initialChart.push(chart)
        }
        // nouislider draw
        this.moleculeConfig.range.max = this.molecule.initialChart.length - 1 || 1
        if (this.moleculeNS) {
          this.moleculeNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.molecule.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.molecule.initialDataTable)
        this.dataTableSource.load(this.molecule.initialDataTable)
        // datachart redraw
        this.molecule.drawChartStartPos = -1;
        this.molecule.liveChartActivate = false;
        this.drawLiveChart();
        this.molecule.timer = setInterval(this.drawLiveChart.bind(this), 5000);
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.molecule.liveChartActivate) return;
    if (!force) {
      this.molecule.drawChartStartPos++;
    }

    if (this.molecule.drawChartStartPos > this.molecule.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.molecule.drawChartStartPos = 0;
    }
    this.molecule.liveChart = this.molecule.initialChart.slice(this.molecule.drawChartStartPos, this.molecule.drawChartStartPos + this.barChartSettings.barChartDisplayCount);
  }
}
