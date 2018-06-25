import { IApi } from 'regexp-cjk';
export * from './table';
export declare const SP_KEY = "#_@_#";
export declare const SP_REGEXP = "(?:@|\uFF08\u00B7?\uFF09|-|/|\\(\\)|%|\uFFE5|_|\\?|\uFF1F|\\||#|\\$|[\uFF08\\(](?:\u548C\u8C10|\u6CB3\u87F9)[\\)\uFF09]|\uFF08\u6CB3\uFF09\uFF08\u87F9\uFF09|[\uFF08\\(][\u6CB3\u87F9]{1,2}[\\)\uFF09]| |\\.|[\u30FB\u00B7]|\\*|\u25A1|\u570C|[=\uFF1D]|\\\\\\\\|\\/\\/|\uFF5C)";
export declare const SP_REGEXP_UNSAFE: string;
export declare const SP_ESCAPE = "\uFF08\u6CB3\u87F9\uFF09";
export declare const SP_REGEXP_STRICT: string;
export interface IOptions {
    toRegExp?: IApi;
    fnSplitChar?: (s: string) => string[];
    count?: number;
    staticReturn?: boolean;
    tables?: any;
    flags?: string;
    unsafe?: boolean;
    strict?: boolean;
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
