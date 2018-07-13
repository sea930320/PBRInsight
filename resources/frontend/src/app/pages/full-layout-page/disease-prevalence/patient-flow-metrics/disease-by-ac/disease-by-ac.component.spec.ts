import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseByAcComponent } from './disease-by-ac.component';

describe('DiseaseByAcComponent', () => {
  let component: DiseaseByAcComponent;
  let fixture: ComponentFixture<DiseaseByAcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseByAcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseByAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
