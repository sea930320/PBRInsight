import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeAnalyticsComponent } from './molecule-analytics.component';

describe('MoleculeAnalyticsComponent', () => {
  let component: MoleculeAnalyticsComponent;
  let fixture: ComponentFixture<MoleculeAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoleculeAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
