import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoPanelComponent } from './demo-panel.component';

describe('DemoPanelComponent', () => {
  let component: DemoPanelComponent;
  let fixture: ComponentFixture<DemoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
