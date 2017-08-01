import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectionComponent } from './detection.component';

describe('DetectionComponent', () => {
  let component: DetectionComponent;
  let fixture: ComponentFixture<DetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
