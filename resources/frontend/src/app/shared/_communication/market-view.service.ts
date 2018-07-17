import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class MarketViewCommunicationService {

  selectedYear = ""
  filter: any

  @Output() changeYear: EventEmitter<any> = new EventEmitter();
  @Output() changeFilter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  changeYearEmit(year) {
    this.selectedYear = year
    console.log('year change event emit')
    console.log(this.selectedYear);
    this.changeYear.emit(this.selectedYear)
  }

  changeFilterEmit(filter) {
    this.filter = filter
    console.log('filter change event emit')
    console.log(this.filter);
    this.changeFilter.emit(this.filter)
  }
}
