import { Component, OnInit } from '@angular/core';

import { CoMorbiditiesService } from '../../../../shared/_api/co_morbidities.service';

import { ClinicTypeService } from '../../../../shared/_api/clinic_type.service';
import { TherapyAreaService } from '../../../../shared/_api/therapy_area.service';

import * as chartsData from '../../../../shared/_config/ngx-charts.config'
import { formatLabel } from '../../../../shared/_helpers/common';

@Component({
  selector: 'app-co-morbidities',
  templateUrl: './co-morbidities.component.html',
  styleUrls: ['./co-morbidities.component.scss']
})
export class CoMorbiditiesComponent implements OnInit {
  // global Settings
  years = null
  clinicTypes = []
  therapyAreas = []
  // Pie Charts
  pieChartSettings = chartsData.pieChartSettings;
  pieChartView: any[] = chartsData.pieChartView;
  // Co-Morbidities Chart
  coMorbidities = {
    data: null,
    totalOccurence: null,
    liveChart: []
  }
  filter = {
    therapy_area_id: 1,
    start_year: "",
    start_quarater: "",
    end_year: "",
    end_quarater: "",
    clinic_type_id: ""
  }
  //Diagnosis Set
  diagonsisSets = null

  constructor(private coMorbiditiesService: CoMorbiditiesService, private clinicTypeService: ClinicTypeService, private therapyAreaService: TherapyAreaService) { }

  ngOnInit() {
    this.years = this.getYears(2016)
    this.fetchClinicType()
    this.fetchData()
    this.fetchTherapyArea()
  }

  getYears(startYear) {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(currentYear--);
    }
    return years;
  }

  fetchData() {
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

  fetchClinicType() {
    this.clinicTypeService.index()
      .subscribe((res: any) => {
        this.clinicTypes = res.clinic_types
      });
  }

  fetchTherapyArea() {
    this.therapyAreaService.index()
      .subscribe((res: any) => {
        this.therapyAreas = res.therapy_areas
      });
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
}
