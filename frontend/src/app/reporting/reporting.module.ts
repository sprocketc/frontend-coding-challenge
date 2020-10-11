import { NgModule } from '@angular/core';
import { CommonModule , CurrencyPipe, DecimalPipe , PercentPipe} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LabourCostReportComponent } from './reports/labour-cost-report/labour-cost-report.component';
import { TableComponent } from './table/table.component';
import { CaretDownComponent } from './icons/caret-down/caret-down.component';
import { TableCellComponent } from './table/table-cell/table-cell.component';

@NgModule({
  declarations: [
    LabourCostReportComponent,
    TableComponent,
    CaretDownComponent,
    TableCellComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    DecimalPipe,
    PercentPipe,
    CurrencyPipe
  ],
  exports: [
    LabourCostReportComponent
  ]
})
export class ReportingModule { }
