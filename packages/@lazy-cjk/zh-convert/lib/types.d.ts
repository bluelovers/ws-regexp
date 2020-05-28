import { _call } from './util';
export interface ITable {
    [key: string]: string;
}
export interface IOptions {
    /**
     * 忽略的字 or 任何支援 indexOf 的 Object
     */
    skip?: any;
    table?: ITable | typeof _call;
    safe?: boolean;
    tableOnly?: boolean;
}
