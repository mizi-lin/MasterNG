import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatWidgetComponent } from './heat-widget.component';

describe('HeatWidgetComponent', () => {
  let component: HeatWidgetComponent;
  let fixture: ComponentFixture<HeatWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
