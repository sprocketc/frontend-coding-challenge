import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourCostReportComponent } from './labour-cost-report.component';

describe('LabourCostReportComponent', () => {
  let component: LabourCostReportComponent;
  let fixture: ComponentFixture<LabourCostReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourCostReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourCostReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
