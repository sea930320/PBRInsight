import { Component, OnInit } from '@angular/core';

import { PopulationService } from '../../../../shared/_api/population.service';
import { ClinicTypeService } from '../../../../shared/_api/clinic_type.service';

@Component({
  selector: 'app-brand-molecule',
  templateUrl: './brand-molecule.component.html',
  styleUrls: ['./brand-molecule.component.scss']
})
export class BrandMoleculeComponent implements OnInit {

  // global Settings
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
