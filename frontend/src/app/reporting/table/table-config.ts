export interface TableConfig {
  sortBy?: string;
  sortDirection?: SortDirection;
  columns?: TableColumn[];
  title?: string;
  trackRowsBy?: Function; // SEE: https://angular.io/api/core/TrackByFunction
  rows?: {
    groups?: Array<Object[]>;
    foot?: Object[];
  };
}

export interface TableColumn {
  title: string;
  property: string;
  type: TableColumnType;
  class?: string;
  digitsInfo?: string;
}

export enum TableColumnType {
  STRING = "string",
  PERCENT = "percnt",
  NUMERIC = "numeric",
  CURRENCY = "currency"
}

export enum SortDirection {
  ASC = 1,
  DESC = ~ASC // Use operator NOT (~) to get the inverted direction
}