import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbrsolutionComponent } from './pbrsolution.component';

describe('PbrsolutionComponent', () => {
  let component: PbrsolutionComponent;
  let fixture: ComponentFixture<PbrsolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbrsolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbrsolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
