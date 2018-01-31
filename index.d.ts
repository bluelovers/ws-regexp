export declare const SP_KEY = "#_@_#";
export declare const SP_REGEXP = "(?:@|（·?）|-|/|\\(\\)|%|￥|_|\\?|？|\\||#|\\$|[（\\(](?:和谐|河蟹)[\\)）]|（河）（蟹）|[（\\(][河蟹]{1,2}[\\)）]| |\\.|[・。·])";
export declare const SP_ESCAPE = "（河蟹）";
export declare const table: string[];
export declare const table2: string[][];
export interface IOptions {
    toRegExp?: () => RegExp;
    count?: number;
}
export declare function escape(text: string, options?: IOptions): string;
export declare function unescape(text: string, options?: IOptions): string;
export declare function getTable(options?: IOptions): [string, string, string][];
import * as self from './index';
export default self;
