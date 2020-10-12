import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { LabourStats, ProviderLabourStats } from '../../domain/labour-stats.model';
import { BaseReport } from '../base-report';
import { LabourStatsService } from '../../services/labour-stats.service';
import { TableColumnType, SortDirection } from '../../table/table-config';


@Component({
  selector: 'app-labour-cost-report',
  templateUrl: './labour-cost-report.component.html',
  styleUrls: ['./labour-cost-report.component.scss']
})
export class LabourCostReportComponent extends BaseReport implements OnInit {

  private labourStatsReport: LabourStats;

  constructor(protected labourStatsService: LabourStatsService) {
      super();
    }

  ngOnInit(): void {
    this.labourStatsService.getLabourStats().pipe(first()).subscribe((report:LabourStats[]) => {
      this.labourStatsReport = report[0];

      ["providers", "directContractors", "total"].forEach(group => this.labourStatsReport[group].map((stats:ProviderLabourStats) => {
        stats["complianceScore"] = stats.complianceStats ? stats.complianceStats.Total / 100 : 0;
        stats["workForce"] = stats.workerCount / this.labourStatsReport.total[0].workerCount;
        ["labourCostTotal", "grossPayTotal", "payrollAdminTotal"].forEach(property => {
          stats[property] = stats[property] / 100;
        });
      }))

      this.setConfig({
        sortBy: "name",
        sortDirection: SortDirection.DESC,
        title: "Labour cost report",
        trackRowsBy: (index: number, item: ProviderLabourStats) => item.providerId,
        columns:  [
          {
            title: "Payroll Provider",
            property: "name",
            type: TableColumnType.STRING
          }, {
            title: "Worker",
            property: "workerCount",
            type: TableColumnType.NUMERIC
          }, {
            title: "Compliance Score",
            property: "complianceScore",
            class: "right-separator",
            type: TableColumnType.PERCENT,
            digitsInfo: '1.0-0'
          }, {
            title: "Gross Pay (E)",
            property: "grossPayTotal",
            class: 'text-color-default',
            type: TableColumnType.CURRENCY,
            digitsInfo: '1.0-0'
          },{
            title: "Payroll Admin (E)",
            property: "payrollAdminTotal",
            type: TableColumnType.CURRENCY,
            digitsInfo: '1.0-0'
          }, {
            title: "Labour Cost (E)",
            property: "labourCostTotal",
            class: 'right-separator',
            type: TableColumnType.CURRENCY,
            digitsInfo: '1.0-0'
          }, {
            title: "Work-Force",
            property: "workForce",
            type: TableColumnType.PERCENT,
            digitsInfo: '1.1-1'
          }
        ],
        rows: {
          groups: null,
          foot: null,
        },
      });

      this.sortRows();
    });
  }

  sortRows(): void {
    const rows = {
      groups:  [
        this.labourStatsReport.directContractors,
        this.labourStatsReport.providers
    ],
      foot: this.labourStatsReport.total
    };

    if (this.getConfig().sortBy !== "name") {
      rows.groups = [this.labourStatsReport.directContractors.concat(this.labourStatsReport.providers)]
    }

    this.setRows(rows);

    super.sortRows();
  }

}