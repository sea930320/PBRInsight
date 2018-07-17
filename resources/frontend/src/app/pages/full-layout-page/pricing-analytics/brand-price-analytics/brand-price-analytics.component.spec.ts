import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandPriceAnalyticsComponent } from './brand-price-analytics.component';

describe('BrandPriceAnalyticsComponent', () => {
  let component: BrandPriceAnalyticsComponent;
  let fixture: ComponentFixture<BrandPriceAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandPriceAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandPriceAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
