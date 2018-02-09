export * from './table';
export declare const SP_KEY = "#_@_#";
export declare const SP_REGEXP = "(?:@|（·?）|-|/|\\(\\)|%|￥|_|\\?|？|\\||#|\\$|[（\\(](?:和谐|河蟹)[\\)）]|（河）（蟹）|[（\\(][河蟹]{1,2}[\\)）]| |\\.|[・。·]|\\*|□|圌)";
export declare const SP_ESCAPE = "（河蟹）";
export interface IOptions {
    toRegExp?: () => RegExp;
    count?: number;
    followReturn?: boolean;
    tables?: any;
    flags?: string;
}
export declare function escape(text: string, options?: IOptions): string;
export declare function unescape(text: string, options?: IOptions): string;
export declare function getTable(options?: IOptions): [string, string, string][];
import * as self from './index';
export default self;
