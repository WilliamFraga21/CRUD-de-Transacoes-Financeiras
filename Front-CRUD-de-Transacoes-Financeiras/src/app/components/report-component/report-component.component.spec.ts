import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportComponentComponent } from './report-component.component';

describe('ReportComponentComponent', () => {
  let component: ReportComponentComponent;
  let fixture: ComponentFixture<ReportComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
