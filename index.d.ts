import { IApi } from 'regexp-cjk';
export * from './table';
export declare const SP_KEY = "#_@_#";
export declare const SP_REGEXP = "(?:@|（·?）|-|/|\\(\\)|%|￥|_|\\?|？|\\||#|\\$|[（\\(](?:和谐|河蟹)[\\)）]|（河）（蟹）|[（\\(][河蟹]{1,2}[\\)）]| |\\.|[・。·]|\\*|□|圌)";
export declare const SP_ESCAPE = "（河蟹）";
export interface IOptions {
    toRegExp?: IApi;
    fnSplitChar?: (s: string) => string[];
    count?: number;
    staticReturn?: boolean;
    tables?: any;
    flags?: string;
}
export declare function escape(text: string, options?: IOptions): string;
export declare function unescape(text: string, options?: IOptions): string;
export declare function getTable(options?: IOptions): [string, string, string][];
export interface ICache {
    [key: string]: any;
    [index: number]: any;
    retLast?: String | Function;
}
export declare function loopTable(cb: (value: string, index: number, array: string[], options: IOptions, cache?: ICache) => any, options: IOptions): any;
export declare function splitChar(s: string): string[];
import * as self from './index';
export default self;
