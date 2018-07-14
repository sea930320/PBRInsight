import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicShareComponent } from './clinic-share.component';

describe('ClinicShareComponent', () => {
  let component: ClinicShareComponent;
  let fixture: ComponentFixture<ClinicShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
