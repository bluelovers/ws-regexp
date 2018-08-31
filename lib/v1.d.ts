/**
 * Created by user on 2018/1/31/031.
 *
 * 已廢棄
 */
import * as self from './v1';
export declare function replace_literal(r: string, cb: (text: string) => string): string;
export declare function replace_literal(r: RegExp, cb: (text: string) => string): RegExp;
export declare function array_unique(array: any[]): any[];
export declare const matchOperatorsRe: RegExp;
export declare function regex_str(str: string): string;
export declare function _word_zh(search: string, ret: any, flags?: any, skip?: string): any;
export declare function _word_zh(search: RegExp, ret: any, flags?: any, skip?: string): any;
export declare function _word_zh_core(search: string, skip?: string): string;
export default self;
