import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Atc1ShareComponent } from './atc1-share.component';

describe('Atc1ShareComponent', () => {
  let component: Atc1ShareComponent;
  let fixture: ComponentFixture<Atc1ShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Atc1ShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Atc1ShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
