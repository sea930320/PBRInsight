import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class DiagnoticsCommunicationService {

  filter = {
    classification: "",
    sub_analysis_1: "",
    sub_analysis_2: "",
    start_year: "",
    start_quarater: "",
    end_year: "",
    end_quarater: ""
  }

  @Output() changeFilter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  changeFilterEmit(filter) {
    this.filter = filter
    console.log('filter change event emit')
    console.log(this.filter);
    this.changeFilter.emit(this.filter)
  }
}
