import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Atc2ShareComponent } from './atc2-share.component';

describe('Atc2ShareComponent', () => {
  let component: Atc2ShareComponent;
  let fixture: ComponentFixture<Atc2ShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Atc2ShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Atc2ShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
