import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAccessFormComponent } from './request-access-form.component';

describe('RequestAccessFormComponent', () => {
  let component: RequestAccessFormComponent;
  let fixture: ComponentFixture<RequestAccessFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestAccessFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
