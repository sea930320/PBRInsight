import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Atc5ShareTaComponent } from './atc5-share-ta.component';

describe('Atc5ShareTaComponent', () => {
  let component: Atc5ShareTaComponent;
  let fixture: ComponentFixture<Atc5ShareTaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Atc5ShareTaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Atc5ShareTaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
