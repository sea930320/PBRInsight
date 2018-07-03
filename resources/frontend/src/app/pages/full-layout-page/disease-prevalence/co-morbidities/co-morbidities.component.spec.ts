import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoMorbiditiesComponent } from './co-morbidities.component';

describe('CoMorbiditiesComponent', () => {
  let component: CoMorbiditiesComponent;
  let fixture: ComponentFixture<CoMorbiditiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoMorbiditiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoMorbiditiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
