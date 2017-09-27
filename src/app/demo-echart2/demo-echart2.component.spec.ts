import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoEchart2Component } from './demo-echart2.component';

describe('DemoEchart2Component', () => {
  let component: DemoEchart2Component;
  let fixture: ComponentFixture<DemoEchart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoEchart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoEchart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
