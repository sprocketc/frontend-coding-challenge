import {BehaviorSubject, Observable} from 'rxjs';

import { TableConfig, TableColumnType, SortDirection } from '../table/table-config';

export abstract class BaseReport {
  private readonly tableConfig: BehaviorSubject<TableConfig> = new BehaviorSubject(<TableConfig>{});
  public readonly tableConfig$: Observable<TableConfig> = this.tableConfig.asObservable();

  constructor() {}

  protected getConfig(): TableConfig {
    return this.tableConfig.getValue();
  }

  protected setConfig(config: TableConfig): void {
    this.tableConfig.next(config);
  }

  protected setSortDirection(direction:SortDirection) {
    const config = {...this.getConfig(), sortDirection: direction};
    this.setConfig(config);
  }

  protected setSortBy(property: string) {
    const config = {...this.getConfig(), sortBy: property};
    this.setConfig(config);
  }

  protected setRows(rows) {
    const config = {...this.getConfig(), rows: rows};
    this.setConfig(config);
  }

  onColumnHeadClicked(property: string) {
    if (this.getConfig().sortBy === property) {
      this.setSortDirection(~this.getConfig().sortDirection);
    } else {
      this.setSortBy(property);
      this.setSortDirection(SortDirection.DESC);
    }

    this.sortRows();
  }

  sortRows(): void {
    const config = this.getConfig();
    const property = config.sortBy;
    const column = config.columns.find(column => column.property === property)
    let sortDirection = config.sortDirection;
    
    // Invert sorting direction for strings per design
    if (column.type === TableColumnType.STRING) {
      sortDirection = ~sortDirection;
    }

    config.rows.groups = config.rows.groups.map(group => group.sort((a, b) => {
      const firstItem = a[property];
      const secondItem = b[property];

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

    this.setConfig(config);
  }
}
