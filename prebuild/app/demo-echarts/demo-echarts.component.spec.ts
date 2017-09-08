import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoEchartsComponent } from './demo-echarts.component';

describe('DemoEchartsComponent', () => {
  let component: DemoEchartsComponent;
  let fixture: ComponentFixture<DemoEchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoEchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoEchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
