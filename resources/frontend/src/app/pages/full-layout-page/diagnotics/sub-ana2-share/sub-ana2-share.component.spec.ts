import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAna2ShareComponent } from './sub-ana2-share.component';

describe('SubAna2ShareComponent', () => {
  let component: SubAna2ShareComponent;
  let fixture: ComponentFixture<SubAna2ShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAna2ShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAna2ShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
