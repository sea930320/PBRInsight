import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Atc4ShareTaComponent } from './atc4-share-ta.component';

describe('Atc4ShareTaComponent', () => {
  let component: Atc4ShareTaComponent;
  let fixture: ComponentFixture<Atc4ShareTaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Atc4ShareTaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Atc4ShareTaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
