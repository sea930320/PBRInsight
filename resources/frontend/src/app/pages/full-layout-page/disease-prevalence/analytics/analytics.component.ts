import { Component, OnInit } from '@angular/core';
import { DiseasePrevalenceService } from '../../../../shared/_api/disease_prevalence.service';
import * as chartsData from '../../../../shared/_config/ngx-charts.config'

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  individual = {
    prevalences: null,
    diseases: null,
    totalOccurence: null,
    initialChart: [],
    liveChart: [],
  }

  //Bar Charts
  barChartView: any[] = chartsData.barChartView;

  // options
  barChartShowYAxis = chartsData.barChartShowYAxis;
  barChartShowXAxis = chartsData.barChartShowXAxis;
  barChartGradient = chartsData.barChartGradient;
  barChartShowLegend = chartsData.barChartShowLegend;
  barChartShowXAxisLabel = chartsData.barChartShowXAxisLabel;
  barChartXAxisLabel = chartsData.barChartXAxisLabel;
  barChartShowYAxisLabel = chartsData.barChartShowYAxisLabel;
  barChartYAxisLabel = chartsData.barChartYAxisLabel;
  barChartColorScheme = chartsData.barChartColorScheme;
  barChartDisplayVisible = 0
  barChartDisplayCount = chartsData.barChartDisplayCount;

  settings = {
    columns: {
      name: {
        title: 'Disease Name',
        filter: false,
      },
      value: {
        title: 'Percentage',
        filter: false,
      }
    },
    attr: {
      class: "table table-responsive"
    },
    edit: {
      editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
    }
  };

  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  constructor(private diseasePrevalenceService: DiseasePrevalenceService) {
    setTimeout(() => { this.loadingIndicator = false; }, 1500);
  }

  ngOnInit() {
    this.diseasePrevalenceService.individualDisease({})
      .subscribe((res: any) => {
        this.individual.initialChart = []
        this.individual.liveChart = []
        this.individual.diseases = res.individualDiseases
        this.individual.prevalences = res.individualPrevalences
        this.individual.totalOccurence = res.total
        for (var disease_id in this.individual.diseases) {
          if (!this.individual.diseases.hasOwnProperty(disease_id)) continue;
          var diseaseChart = {
            'name': this.individual.diseases[disease_id],
            'value': this.individual.prevalences[disease_id] ? this.individual.prevalences[disease_id] / this.individual.totalOccurence * 100 : 0,
            'occurence': this.individual.prevalences[disease_id] ? this.individual.prevalences[disease_id] : 0,
            'disease_id': disease_id
          }
          this.individual.initialChart.push(diseaseChart)
        }
        this.individual.liveChart = this.individual.initialChart.slice(this.barChartDisplayVisible, this.barChartDisplayCount);
        setInterval(this.updateData.bind(this), 2000);
      });
  }

  updateData() {
    this.barChartDisplayVisible++;
    this.individual.liveChart = this.individual.initialChart.slice(this.barChartDisplayVisible, this.barChartDisplayVisible + this.barChartDisplayCount);
    if (this.barChartDisplayVisible > this.individual.initialChart.length) {
      this.barChartDisplayVisible = 0;
    }
  }

  onSelect(event) {
    //your code here
  }
}
