import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { TableColumnType } from '../table-config';

@Component({
  selector: 'td[app-table-cell]',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellComponent implements OnInit {
  
  public TableColumnType = TableColumnType;

  constructor() { }

  @Input()
  public type: TableColumnType;

  @Input()
  public value: string | number;

  @Input()
  public digitsInfo?:string = '1.0-0';

  ngOnInit(): void {
  }

}
