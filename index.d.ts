import Vue, { VueConstructor } from 'vue';

export type MaybePromise<T> = T | Promise<T>;
export type TabPanesPosition = 'top' | 'container';

export interface CrudPageResult<T = any> {
  code: number;
  rows: T[];
  total: number;
}

export interface CrudOperationResult {
  code: number;
  [key: string]: any;
}

export interface CrudService<T = any> {
  page?: (params: { [key: string]: any }) => MaybePromise<CrudPageResult<T>>;
  delete?: (id: any) => MaybePromise<CrudOperationResult>;
  add?: (...args: any[]) => any;
  update?: (...args: any[]) => any;
  info?: (...args: any[]) => any;
  list?: (...args: any[]) => any;
  export?: (...args: any[]) => any;
}

export interface CrudInstance<T = any> extends Vue {
  data: T[];
  total: number;
  selections: T[];
  pagination: {
    pageNum: number;
    pageSize: number;
  };
  setService(service: CrudService<T>): void;
  refresh(): Promise<void>;
  getParams(): Promise<{ [key: string]: any }>;
}

export const Crud: VueConstructor<CrudInstance>;
export const CrudTable: VueConstructor<Vue>;
export const QueryForm: VueConstructor<Vue>;
