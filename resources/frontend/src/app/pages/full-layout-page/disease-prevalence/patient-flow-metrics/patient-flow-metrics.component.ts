import { Component, OnInit } from '@angular/core';

import { PopulationService } from '../../../../shared/_api/population.service';
import { ClinicTypeService } from '../../../../shared/_api/clinic_type.service';

@Component({
  selector: 'app-patient-flow-metrics',
  templateUrl: './patient-flow-metrics.component.html',
  styleUrls: ['./patient-flow-metrics.component.scss']
})
export class PatientFlowMetricsComponent implements OnInit {
  // global Settings
  years = null
  clinicTypes = []
  populations = []
  // constructor
  constructor(private populationService: PopulationService, private clinicTypeService: ClinicTypeService) { }

  ngOnInit() {
    this.fetchClinicType()
    this.fetchPopulation()
  }

  fetchClinicType() {
    this.clinicTypes = []
    this.clinicTypeService.index()
      .subscribe((res: any) => {
        this.clinicTypes = res.clinic_types
      });
  }

  fetchPopulation() {
    this.populationService.index()
      .subscribe((res: any) => {
        this.populations = res.populations
      });
  }
}
