import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoRuleComponent } from './demo-rule.component';

describe('DemoRuleComponent', () => {
  let component: DemoRuleComponent;
  let fixture: ComponentFixture<DemoRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
