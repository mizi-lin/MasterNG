import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoLayerComponent } from './demo-layer.component';

describe('DemoLayerComponent', () => {
  let component: DemoLayerComponent;
  let fixture: ComponentFixture<DemoLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
