import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandShareComponent } from './brand-share.component';

describe('BrandShareComponent', () => {
  let component: BrandShareComponent;
  let fixture: ComponentFixture<BrandShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
