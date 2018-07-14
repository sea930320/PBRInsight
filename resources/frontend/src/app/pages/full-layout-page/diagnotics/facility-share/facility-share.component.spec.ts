import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityShareComponent } from './facility-share.component';

describe('FacilityShareComponent', () => {
  let component: FacilityShareComponent;
  let fixture: ComponentFixture<FacilityShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
