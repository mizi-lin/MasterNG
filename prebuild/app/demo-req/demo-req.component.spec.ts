import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoReqComponent } from './demo-req.component';

describe('DemoReqComponent', () => {
  let component: DemoReqComponent;
  let fixture: ComponentFixture<DemoReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
