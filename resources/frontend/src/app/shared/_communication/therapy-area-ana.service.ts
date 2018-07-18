import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class TherapyAreaAnaCommunicationService {

  filter: any

  @Output() changeFilter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  changeFilterEmit(filter) {
    this.filter = filter
    console.log('filter change event emit')
    console.log(this.filter);
    this.changeFilter.emit(this.filter)
  }
}
