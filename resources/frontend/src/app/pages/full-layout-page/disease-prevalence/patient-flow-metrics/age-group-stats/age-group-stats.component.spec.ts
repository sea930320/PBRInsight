import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeGroupStatsComponent } from './age-group-stats.component';

describe('AgeGroupStatsComponent', () => {
  let component: AgeGroupStatsComponent;
  let fixture: ComponentFixture<AgeGroupStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeGroupStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeGroupStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
