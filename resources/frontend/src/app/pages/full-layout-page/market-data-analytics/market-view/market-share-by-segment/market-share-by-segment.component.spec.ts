import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketShareBySegmentComponent } from './market-share-by-segment.component';

describe('MarketShareBySegmentComponent', () => {
  let component: MarketShareBySegmentComponent;
  let fixture: ComponentFixture<MarketShareBySegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketShareBySegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketShareBySegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
