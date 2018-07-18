import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Atc2ShareTaComponent } from './atc2-share-ta.component';

describe('Atc2ShareTaComponent', () => {
  let component: Atc2ShareTaComponent;
  let fixture: ComponentFixture<Atc2ShareTaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Atc2ShareTaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Atc2ShareTaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
