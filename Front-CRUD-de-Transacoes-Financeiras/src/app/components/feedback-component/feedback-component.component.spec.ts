import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackComponentComponent } from './feedback-component.component';

describe('FeedbackComponentComponent', () => {
  let component: FeedbackComponentComponent;
  let fixture: ComponentFixture<FeedbackComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
