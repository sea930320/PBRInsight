import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseByAtcComponent } from './disease-by-atc.component';

describe('DiseaseByAtcComponent', () => {
  let component: DiseaseByAtcComponent;
  let fixture: ComponentFixture<DiseaseByAtcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseByAtcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseByAtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
