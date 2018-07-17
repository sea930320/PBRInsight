import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculePriceAnalyticsComponent } from './molecule-price-analytics.component';

describe('MoleculePriceAnalyticsComponent', () => {
  let component: MoleculePriceAnalyticsComponent;
  let fixture: ComponentFixture<MoleculePriceAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoleculePriceAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculePriceAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
