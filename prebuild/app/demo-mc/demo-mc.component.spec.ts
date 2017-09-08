import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoMcComponent } from './demo-mc.component';

describe('DemoMcComponent', () => {
  let component: DemoMcComponent;
  let fixture: ComponentFixture<DemoMcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoMcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoMcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
