import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { Atc1Service } from '../../../../shared/_api/atc1.service';
import { DrugFormService } from '../../../../shared/_api/drug-form.service';

@Component({
  selector: 'app-therapy-area-analytics',
  templateUrl: './therapy-area-analytics.component.html',
  styleUrls: ['./therapy-area-analytics.component.scss']
})
export class TherapyAreaAnalyticsComponent implements OnInit {

  // global Settings
  atc1s = []
  drugForms = []
  isLoaded = false

  constructor(private drugFormService: DrugFormService, private atc1Service: Atc1Service) { }

  ngOnInit() {
    this.fetchGlobal();
  }

  fetchGlobal() {
    this.atc1s = []
    this.drugForms = []

    let values$ = combineLatest(
      this.drugFormService.index(),
      this.atc1Service.index(),
      (first, second) => {
        return { first, second };
      }
    );
    values$.subscribe((res: any) => {
      this.drugForms = res.first.drug_forms
      this.atc1s = res.second.atc1s
      this.isLoaded = true;
    });
  }
}
