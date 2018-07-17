import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyAreaAnalyticsComponent } from './therapy-area-analytics.component';

describe('TherapyAreaAnalyticsComponent', () => {
  let component: TherapyAreaAnalyticsComponent;
  let fixture: ComponentFixture<TherapyAreaAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapyAreaAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapyAreaAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
