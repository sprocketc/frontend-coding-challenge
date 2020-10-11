import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TableConfig, TableColumnType, SortDirection } from '../../reporting/table/table-config';

import { listAnimation } from '../animations';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  public TableColumnType = TableColumnType;
  public SortDirection = SortDirection;

  @Input()
  public config: TableConfig;

    @Output()
  public columnHeadClicked: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onColumnHeadClick(property: string) {
    this.columnHeadClicked.emit(property);
  }
}
