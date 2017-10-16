import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoDatetimeComponent } from './demo-datetime.component';

describe('DemoDatetimeComponent', () => {
  let component: DemoDatetimeComponent;
  let fixture: ComponentFixture<DemoDatetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoDatetimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
