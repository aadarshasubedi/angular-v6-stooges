export interface MatTableGenerateRowNgClassFn<T> {
    (resource: T, index: number): {
      [propName: string]: boolean
    };
  }