import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoNodataComponent } from './demo-nodata.component';

describe('DemoNodataComponent', () => {
  let component: DemoNodataComponent;
  let fixture: ComponentFixture<DemoNodataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoNodataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoNodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
