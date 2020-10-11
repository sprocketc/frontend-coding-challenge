import {BehaviorSubject, Observable} from 'rxjs';

import { TableConfig, TableColumnType, SortDirection } from '../table/table-config';

export abstract class BaseReport {
  protected config: TableConfig;
  protected tableConfig: BehaviorSubject<TableConfig> = new BehaviorSubject({});
  public tableConfig$: Observable<TableConfig> = this.tableConfig.asObservable();

  constructor() {}

  onColumnHeadClicked(property: string) {
    if (this.config.sortBy === property) {
      this.config.sortDirection = ~this.config.sortDirection;
    } else {
      this.config.sortBy = property;
      this.config.sortDirection = SortDirection.DESC;
    }

    this.sort();
  }

  sort(): void {
    const property = this.config.sortBy;
    const column = this.config.columns.find(column => column.property === property)
    let sortDirection = this.config.sortDirection;
    
    // Invert sorting direction for strings per design
    if (column.type === TableColumnType.STRING) {
      sortDirection = ~sortDirection;
    }

    this.config.rows.groups = this.config.rows.groups.map(group => group.sort((a, b) => {
      let firstItem = a[property];
      let secondItem = b[property];

      let result = 0;

      if (column.type === TableColumnType.STRING) {
        result = firstItem.localeCompare(secondItem);
      } else if (firstItem > secondItem) {
        result = 1;
      } else if (firstItem < secondItem) {
        result = -1;
      }

      return result * sortDirection;
    }));    

    this.tableConfig.next(this.config);
  }
}
