import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAna1ShareComponent } from './sub-ana1-share.component';

describe('SubAna1ShareComponent', () => {
  let component: SubAna1ShareComponent;
  let fixture: ComponentFixture<SubAna1ShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAna1ShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAna1ShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
