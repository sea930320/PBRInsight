import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseByBrandComponent } from './disease-by-brand.component';

describe('DiseaseByBrandComponent', () => {
  let component: DiseaseByBrandComponent;
  let fixture: ComponentFixture<DiseaseByBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseByBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseByBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
