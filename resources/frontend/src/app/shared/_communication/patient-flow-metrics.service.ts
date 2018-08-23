import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class PatientFlowMetricsCommunicationService {

  filter = {
    classification: "",
    year: "",
    end_quarater: ""
  }
  groups = [];

  @Output() changeFilter: EventEmitter<any> = new EventEmitter();
  @Output() changeGroup: EventEmitter<any> = new EventEmitter();

  constructor() { }

  changeFilterEmit(filter) {
    this.filter = filter
    console.log('filter change event emit')
    console.log(this.filter);
    this.changeFilter.emit(this.filter)
  }

  changeGroupEmit(groups) {
    this.groups = groups
    console.log('group change event emit')
    console.log(this.groups);
    this.changeGroup.emit(this.groups)
  }
}
