import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFlowMetricsComponent } from './patient-flow-metrics.component';

describe('PatientFlowMetricsComponent', () => {
  let component: PatientFlowMetricsComponent;
  let fixture: ComponentFixture<PatientFlowMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFlowMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFlowMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
