export declare function replace_literal(r: string, cb: (text: string) => string): string;
export declare function replace_literal(r: RegExp, cb: (text: string) => string): RegExp;
export declare let local_range: string[][];
export declare function array_unique(array: any[]): any[];
export declare const matchOperatorsRe: RegExp;
export declare function regex_str(str: string): string;
export declare function _word_zh(search: string, ret: any, flags?: any, skip?: string): any;
export declare function _word_zh(search: RegExp, ret: any, flags?: any, skip?: string): any;
export declare function _word_zh_core(search: string, skip: string): string;
export declare namespace zhtw_convert {
    const table_jp: {
        'の': string[];
        '劍': string[];
        '剣': string[];
        '画': string[];
    };
    function tw(char: any): string[];
    function cn(char: any): string[];
}
import * as self from './lib';
export default self;
