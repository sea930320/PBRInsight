import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandMoleculeComponent } from './brand-molecule.component';

describe('BrandMoleculeComponent', () => {
  let component: BrandMoleculeComponent;
  let fixture: ComponentFixture<BrandMoleculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandMoleculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandMoleculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
