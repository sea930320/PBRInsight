import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcShareComponent } from './ac-share.component';

describe('AcShareComponent', () => {
  let component: AcShareComponent;
  let fixture: ComponentFixture<AcShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
