import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostTreatmentMetricsComponent } from './cost-treatment-metrics.component';

describe('CostTreatmentMetricsComponent', () => {
  let component: CostTreatmentMetricsComponent;
  let fixture: ComponentFixture<CostTreatmentMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostTreatmentMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostTreatmentMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
