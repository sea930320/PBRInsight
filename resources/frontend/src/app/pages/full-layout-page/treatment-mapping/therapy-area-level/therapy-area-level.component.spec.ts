import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyAreaLevelComponent } from './therapy-area-level.component';

describe('TherapyAreaLevelComponent', () => {
  let component: TherapyAreaLevelComponent;
  let fixture: ComponentFixture<TherapyAreaLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapyAreaLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapyAreaLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
