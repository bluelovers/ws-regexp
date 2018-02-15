export interface ITable {
    [key: string]: string;
}
export declare let table_cn2tw: ITable;
export declare let table_tw2cn: ITable;
export declare function cn2tw(text: string): string;
export declare function tw2cn(text: string): string;
import * as self from './convert';
export default self;
