import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationShareComponent } from './classification-share.component';

describe('ClassificationShareComponent', () => {
  let component: ClassificationShareComponent;
  let fixture: ComponentFixture<ClassificationShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificationShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
